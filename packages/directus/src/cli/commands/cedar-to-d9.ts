import * as fs from 'fs';
import * as cedar from '@cedar-policy/cedar-wasm/nodejs';

const { readFile, readdir, writeFile } = fs.promises;

/**
 * Reverse of the d9-to-cedar translation in app-api2: reads the per-role Cedar policy files
 * (authorize.cedar / check-fields.cedar / validate.cedar) under ./permissions
 * and merges them back into ./sql/data/directus_permissions.csv.
 *
 * The Cedar output is lossy: it carries only the role NAME (not its UUID), no
 * permission `id`, and no `presets`. We therefore keep the original CSV as the
 * base of truth for those columns and only overwrite the three columns that are
 * derivable from Cedar: `permissions`, `fields` and `validation`. When the role
 * exists but a (role, collection, action) tuple is new, a fresh row is created.
 *
 * Cedar -> D9 normalizations (semantically equivalent for Directus):
 *  - `_icontains` -> `_contains` (value also lowercased) — genuinely lossy, but
 *    recovered from the original CSV for unedited clauses (see recoverIContains)
 *  - implicit multi-key AND and right-leaning `&&`/`||` -> explicit `_and`/`_or`
 *  - bare scalar -> explicit `_eq`
 *  - `_null:false`/`_nnull:false` -> canonical `_nnull:true`/`_null:true`
 */

type Filter = Record<string, any>;
type ConditionSubject = 'resource' | 'context.newValue';

interface EntityRef {
  type: string;
  id: string;
}

interface ReconstructedPermission {
  roleName: string;
  collection: string;
  action: string;
  permissions?: Filter;
  fields?: string[];
  validation?: Filter;
}

// ---------------------------------------------------------------------------
// CSV helpers (quote-aware: the naive split in save/utils would corrupt the
// JSON `permissions`/`validation` cells, so we keep a robust reader/writer here)
// ---------------------------------------------------------------------------

function readFirstLineOfFile(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const rs = fs.createReadStream(filePath);
    let acc = '';
    let pos = 0;
    let index: number;
    rs
      .on('data', (chunk: any) => {
        acc += chunk;
        index = chunk.indexOf('\n');
        if (index === -1) {
          pos += chunk.length;
        } else {
          pos += index;
          rs.close();
        }
      })
      .on('close', () =>
        resolve(acc.slice(acc.charCodeAt(0) === 0xfeff ? 1 : 0, pos)),
      )
      .on('error', (err: Error) => reject(err));
  });
}

async function readCsvFile(
  filePath: string,
): Promise<{ [key: string]: string }[]> {
  const result: { [key: string]: string }[] = [];
  const fileContent = (await readFile(filePath)).toString();
  const lines = fileContent
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line);
  const firstLine = lines[0].split(',').map((key: string) => key.trim());
  const otherLines = lines.slice(1);
  // Matches commas that are NOT inside double quotes.
  const csvSplitRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
  for (const line of otherLines) {
    const values = line.split(csvSplitRegex).map((val: string) => {
      let trimmed = val.trim();
      // Remove surrounding quotes and unescape double-double quotes ("").
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        trimmed = trimmed.slice(1, -1).replace(/""/g, '"');
      }
      return trimmed;
    });
    const item: { [key: string]: string } = {};
    for (let i = 0; i < values.length; i++) {
      item[firstLine[i]] = values[i];
    }
    result.push(item);
  }
  return result;
}

function escapeCsvCell(value: string): string {
  if (value.includes('"') || value.includes(',') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

async function writeCsvFile(
  filePath: string,
  header: string[],
  rows: Record<string, string>[],
): Promise<void> {
  const lines = [header.join(',')];
  for (const row of rows) {
    lines.push(header.map((col) => escapeCsvCell(row[col] ?? '')).join(','));
  }
  await writeFile(filePath, `${lines.join('\n')}\n`);
}

// ---------------------------------------------------------------------------
// Inverse of addWhenClauses: Cedar Expr tree -> D9 Filter
// ---------------------------------------------------------------------------

function entityOf(entity: any): EntityRef {
  return (entity?.__entity ?? entity) as EntityRef;
}

function rightToValue(right: any): any {
  if (right && right.Var === 'principal') return '$CURRENT_USER';
  if (right && 'Value' in right) return right.Value;
  throw new Error(
    `Unsupported right-hand Cedar expression: ${JSON.stringify(right)}`,
  );
}

/**
 * Walk the left-nested `.` attribute chain back into a path array, rooted at
 * `resource` or `context.newValue`.
 */
function exprPathToSegments(node: any, subject: ConditionSubject): string[] {
  const attrs: string[] = [];
  let cur = node;
  while (cur && cur['.']) {
    attrs.push(cur['.'].attr);
    cur = cur['.'].left;
  }
  attrs.reverse();

  if (subject === 'context.newValue') {
    if (!(cur && cur.Var === 'context') || attrs[0] !== 'newValue') {
      throw new Error(
        `Unexpected context.newValue base path: ${JSON.stringify(node)}`,
      );
    }
    return attrs.slice(1);
  }

  if (!(cur && cur.Var === 'resource')) {
    throw new Error(`Unexpected resource base path: ${JSON.stringify(node)}`);
  }
  return attrs;
}

function nestPath(segments: string[], leaf: Record<string, any>): Filter {
  if (segments.length === 0) return leaf as Filter;
  const root: Record<string, any> = {};
  let cur = root;
  for (let i = 0; i < segments.length; i++) {
    if (i === segments.length - 1) {
      cur[segments[i]] = leaf;
    } else {
      cur[segments[i]] = {};
      cur = cur[segments[i]];
    }
  }
  return root as Filter;
}

/** Flatten a right-leaning binary chain (`{op:{left,right}}`) into N operands. */
function flattenBinary(expr: any, op: string): any[] {
  const out: any[] = [];
  let cur = expr;
  while (cur && cur[op]) {
    out.push(cur[op].left);
    cur = cur[op].right;
  }
  if (cur) out.push(cur);
  return out;
}

function patternToOperation(pattern: any[]): { operator: string; value: any } {
  // Cedar normalizes a `like` pattern into per-character Literal elements, so
  // concatenate every Literal segment back into the original string.
  const value = pattern
    .filter((p) => p !== 'Wildcard')
    .map((p) => p.Literal)
    .join('');
  const startsWildcard = pattern[0] === 'Wildcard';
  const endsWildcard = pattern[pattern.length - 1] === 'Wildcard';
  if (startsWildcard && endsWildcard) return { operator: '_contains', value };
  if (endsWildcard) return { operator: '_starts_with', value };
  if (startsWildcard) return { operator: '_ends_with', value };
  throw new Error(`Unsupported like pattern: ${JSON.stringify(pattern)}`);
}

const COMPARISON_OPS: Record<string, string> = {
  '==': '_eq',
  '!=': '_neq',
  '>': '_gt',
  '>=': '_gte',
  '<': '_lt',
  '<=': '_lte',
};

export function exprToFilter(
  expr: any,
  subject: ConditionSubject = 'resource',
): Filter {
  if (!expr) return {};
  const key = Object.keys(expr)[0];
  const node = expr[key];

  if (key === '&&' || key === '||') {
    const operator = key === '&&' ? '_and' : '_or';
    const operands = flattenBinary(expr, key).map((e) =>
      exprToFilter(e, subject),
    );
    return { [operator]: operands } as Filter;
  }

  if (key === 'has') {
    const segments = [...exprPathToSegments(node.left, subject), node.attr];
    return nestPath(segments, { _nnull: true });
  }

  if (key === '!') {
    const arg = node.arg;
    if (arg && arg.has) {
      const segments = [
        ...exprPathToSegments(arg.has.left, subject),
        arg.has.attr,
      ];
      return nestPath(segments, { _null: true });
    }
    throw new Error(`Unsupported negation expression: ${JSON.stringify(expr)}`);
  }

  if (key === 'like') {
    const segments = exprPathToSegments(node.left, subject);
    const { operator, value } = patternToOperation(node.pattern);
    return nestPath(segments, { [operator]: value });
  }

  if (key in COMPARISON_OPS) {
    const segments = exprPathToSegments(node.left, subject);
    return nestPath(segments, { [COMPARISON_OPS[key]]: rightToValue(node.right) });
  }

  throw new Error(`Unsupported Cedar expression operator: ${key}`);
}

/** Extract the field list from a check-fields policy's containsAll clause. */
function extractFields(expr: any): string[] {
  const left = expr?.containsAll?.left;
  // A literal array is normalized by Cedar into a Set of Value elements.
  if (Array.isArray(left?.Set)) return left.Set.map((e: any) => e.Value);
  if (Array.isArray(left?.Value)) return left.Value;
  throw new Error(`Unexpected check-fields policy shape: ${JSON.stringify(expr)}`);
}

// ---------------------------------------------------------------------------
// `_icontains` recovery (Cedar has no case-insensitive substring operator, so
// the forward translation collapses _contains/_icontains into the same `like`).
// We restore the original operator + casing for clauses that were not edited.
// ---------------------------------------------------------------------------

interface ContainsLeaf {
  pathKey: string;
  op: '_contains' | '_icontains';
  value: any;
}

const FILTER_LOGIC_KEYS = new Set(['_and', '_or']);

function safeParse(value: string | undefined): any {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function collectContains(node: any, path: string[], out: ContainsLeaf[]): void {
  if (Array.isArray(node)) {
    for (const child of node) collectContains(child, path, out);
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const key of Object.keys(node)) {
    if (FILTER_LOGIC_KEYS.has(key)) {
      collectContains(node[key], path, out);
    } else if (key === '_contains' || key === '_icontains') {
      out.push({ pathKey: path.join('.'), op: key, value: node[key] });
    } else if (!key.startsWith('_')) {
      collectContains(node[key], [...path, key], out);
    }
  }
}

function restoreContains(
  node: any,
  path: string[],
  originals: ContainsLeaf[],
): void {
  if (Array.isArray(node)) {
    for (const child of node) restoreContains(child, path, originals);
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const key of Object.keys(node)) {
    if (FILTER_LOGIC_KEYS.has(key)) {
      restoreContains(node[key], path, originals);
    } else if (key === '_contains') {
      const pathKey = path.join('.');
      const lowered = String(node._contains).toLowerCase();
      const match = originals.find(
        (o) =>
          o.op === '_icontains' &&
          o.pathKey === pathKey &&
          String(o.value).toLowerCase() === lowered,
      );
      if (match) {
        delete node._contains;
        node._icontains = match.value;
      }
    } else if (!key.startsWith('_')) {
      restoreContains(node[key], [...path, key], originals);
    }
  }
}

function recoverIContains(reconstructed: any, original: any): void {
  if (!reconstructed || !original) return;
  const originals: ContainsLeaf[] = [];
  collectContains(original, [], originals);
  if (originals.some((o) => o.op === '_icontains')) {
    restoreContains(reconstructed, [], originals);
  }
}

// ---------------------------------------------------------------------------
// Semantic equality of D9 filters — used to PREFER the original CSV value
// verbatim when the Cedar round-trip did not change the meaning, so unedited
// rows produce zero diff and only genuinely edited clauses get rewritten.
// ---------------------------------------------------------------------------

function stableStringify(value: any): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

function canonicalize(node: any): any {
  if (node === null || node === undefined) return null;
  if (Array.isArray(node)) return node.map(canonicalize);
  if (typeof node !== 'object') return node;

  const keys = Object.keys(node);
  if (keys.length === 0) return null; // {} === empty === null

  if (keys.length === 1 && (keys[0] === '_and' || keys[0] === '_or')) {
    const op = keys[0];
    const raw = Array.isArray(node[op]) ? node[op] : [node[op]];
    const flat: any[] = [];
    for (const child of raw) {
      const cc = canonicalize(child);
      if (cc == null) continue;
      if (
        cc &&
        typeof cc === 'object' &&
        !Array.isArray(cc) &&
        Object.keys(cc).length === 1 &&
        Object.keys(cc)[0] === op &&
        Array.isArray(cc[op])
      ) {
        flat.push(...cc[op]);
      } else {
        flat.push(cc);
      }
    }
    if (flat.length === 0) return null;
    if (flat.length === 1) return flat[0];
    flat.sort((a, b) => stableStringify(a).localeCompare(stableStringify(b)));
    return { [op]: flat };
  }

  const attrKeys = keys.filter((k) => !k.startsWith('_'));
  if (attrKeys.length > 1) {
    return canonicalize({ _and: keys.map((k) => ({ [k]: node[k] })) });
  }

  const out: Record<string, any> = {};
  for (const k of keys) {
    const val = node[k];
    if (k === '_icontains') {
      out._contains = typeof val === 'string' ? val.toLowerCase() : val;
    } else if (k === '_null') {
      if (val === false) out._nnull = true;
      else out._null = true;
    } else if (k === '_nnull') {
      if (val === false) out._null = true;
      else out._nnull = true;
    } else {
      out[k] = canonicalize(val);
    }
  }
  return out;
}

function filtersEqual(a: any, b: any): boolean {
  return stableStringify(canonicalize(a)) === stableStringify(canonicalize(b));
}

function fieldsEqual(a: string, b: string): boolean {
  const norm = (s: string) =>
    (s || '')
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
      .sort()
      .join(',');
  return norm(a) === norm(b);
}

// ---------------------------------------------------------------------------
// Inverse of refactoPolicies: expand `action in [...]` into one entry per tuple
// ---------------------------------------------------------------------------

function expandPolicy(
  policy: any,
): Array<{ collection: string; action: string; conditions: any[] }> {
  const action = policy.action;
  let entities: any[] = [];
  if (action.op === '==') {
    entities = [action.entity];
  } else if (action.op === 'in') {
    entities = action.entities ?? (action.entity ? [action.entity] : []);
  }
  return entities.map((e) => {
    const ent = entityOf(e);
    return {
      collection: ent.type.replace(/^Db::/, '').replace(/::Action$/, ''),
      action: ent.id,
      conditions: policy.conditions ?? [],
    };
  });
}

// ---------------------------------------------------------------------------
// Orchestration
// ---------------------------------------------------------------------------

const PERMISSION_FILE = 'directus_permissions.csv';

export interface CedarToD9Options {
  permissionPath?: string;
  sqlPath?: string;
  outputPath?: string;
  overwrite?: boolean;
}

export class CedarToD9Manager {
  permissionPath: string;
  sqlPath: string;
  outputPath: string;
  overwrite: boolean;

  roleNameToId: Map<string, string> = new Map();
  baseRows: Record<string, string>[] = [];
  header: string[] = [];
  reconstructed: ReconstructedPermission[] = [];

  constructor(opts?: CedarToD9Options) {
    this.permissionPath = opts?.permissionPath || './permissions';
    this.sqlPath = opts?.sqlPath || './sql/data';
    this.overwrite = opts?.overwrite ?? false;
    this.outputPath =
      opts?.outputPath ||
      (this.overwrite
        ? `${this.sqlPath}/${PERMISSION_FILE}`
        : `${this.sqlPath}/directus_permissions.generated.csv`);
  }

  async readBasePermissionFile() {
    const filePath = `${this.sqlPath}/${PERMISSION_FILE}`;
    this.baseRows = await readCsvFile(filePath);
    const firstLine = await readFirstLineOfFile(filePath);
    this.header = firstLine.split(',').map((key) => key.trim());
  }

  async readRoleFile() {
    const roles = await readCsvFile(`${this.sqlPath}/directus_roles.csv`);
    for (const role of roles) {
      this.roleNameToId.set(role.name, role.id);
    }
  }

  /** Read one role folder's three Cedar files into ReconstructedPermission[]. */
  async parseRoleFolder(roleName: string): Promise<ReconstructedPermission[]> {
    const byTuple = new Map<string, ReconstructedPermission>();
    const getEntry = (collection: string, action: string) => {
      const tupleKey = `${collection} ${action}`;
      let entry = byTuple.get(tupleKey);
      if (!entry) {
        entry = { roleName, collection, action };
        byTuple.set(tupleKey, entry);
      }
      return entry;
    };

    const folder = `${this.permissionPath}/${roleName}`;

    const apply = async (
      fileName: string,
      handle: (entry: ReconstructedPermission, conditions: any[]) => void,
    ) => {
      let text: string;
      try {
        text = (await readFile(`${folder}/${fileName}`)).toString();
      } catch {
        return; // file may be absent for a role
      }
      const parts = cedar.policySetTextToParts(text);
      if (parts.type === 'failure') {
        console.error(`failed to split policy set ${folder}/${fileName}`);
        throw new Error(parts.errors as any);
      }
      for (const policyText of parts.policies) {
        const parsed = cedar.policyToJson(policyText);
        if (parsed.type === 'failure') {
          console.error(`failed to parse policy in ${folder}/${fileName}`);
          console.error(policyText);
          throw new Error(parsed.errors as any);
        }
        for (const tuple of expandPolicy(parsed.json)) {
          handle(getEntry(tuple.collection, tuple.action), tuple.conditions);
        }
      }
    };

    await apply('authorize.cedar', (entry, conditions) => {
      entry.permissions = conditions.length
        ? exprToFilter(conditions[0].body, 'resource')
        : {};
    });
    await apply('check-fields.cedar', (entry, conditions) => {
      if (conditions.length) entry.fields = extractFields(conditions[0].body);
    });
    await apply('validate.cedar', (entry, conditions) => {
      if (conditions.length) {
        entry.validation = exprToFilter(conditions[0].body, 'context.newValue');
      }
    });

    return [...byTuple.values()];
  }

  async parseAllFolders() {
    const entries = await readdir(this.permissionPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const folderPerms = await this.parseRoleFolder(entry.name);
      this.reconstructed.push(...folderPerms);
    }
  }

  mergeIntoRows() {
    const tupleKey = (role: string, collection: string, action: string) =>
      `${role} ${collection} ${action}`;

    const index = new Map<string, Record<string, string>>();
    let nextId = 0;
    for (const row of this.baseRows) {
      index.set(tupleKey(row.role ?? '', row.collection, row.action), row);
      const id = Number(row.id);
      if (Number.isFinite(id) && id > nextId) nextId = id;
    }

    let merged = 0;
    let edited = 0;
    let added = 0;
    let skippedRole = 0;

    for (const perm of this.reconstructed) {
      const roleId =
        perm.roleName === 'Public' ? '' : this.roleNameToId.get(perm.roleName);
      if (roleId === undefined) {
        // Skip ONLY when the role itself is unknown — we cannot invent a UUID.
        console.warn(
          `skipping ${perm.collection}/${perm.action}: role "${perm.roleName}" not found in directus_roles.csv`,
        );
        skippedRole++;
        continue;
      }
      let row = index.get(tupleKey(roleId, perm.collection, perm.action));
      if (!row) {
        // New (role, collection, action) added in the Cedar files: the role
        // exists, so create a fresh permission row (new id, resolved role UUID,
        // empty presets). Cedar is fully authoritative for a brand-new row.
        row = {
          id: String(++nextId),
          role: roleId,
          collection: perm.collection,
          action: perm.action,
          permissions: JSON.stringify(perm.permissions ?? {}),
          validation: JSON.stringify(perm.validation ?? {}),
          fields: perm.fields ? perm.fields.join(',') : '*',
          presets: '',
        };
        this.baseRows.push(row);
        index.set(tupleKey(roleId, perm.collection, perm.action), row);
        console.log(
          `added ${perm.roleName}/${perm.collection}/${perm.action} (id ${row.id})`,
        );
        added++;
        merged++;
        continue;
      }
      // Prefer the ORIGINAL cell verbatim whenever the Cedar round-trip did not
      // change the meaning — this keeps unedited rows byte-identical and limits
      // the diff to clauses that were actually edited in the Cedar. Only when a
      // clause genuinely differs do we write the reconstructed (normalized)
      // form, recovering `_icontains` casing on its unedited parts.
      const origPerm = safeParse(row.permissions);
      const permFilter = perm.permissions ?? {};
      recoverIContains(permFilter, origPerm);
      if (!filtersEqual(permFilter, origPerm)) {
        row.permissions = JSON.stringify(permFilter);
        edited++;
      }

      const origVal = safeParse(row.validation);
      const valFilter = perm.validation ?? {};
      recoverIContains(valFilter, origVal);
      if (!filtersEqual(valFilter, origVal)) {
        row.validation = JSON.stringify(valFilter);
        edited++;
      }

      const recFields = perm.fields ? perm.fields.join(',') : '*';
      if (!fieldsEqual(recFields, row.fields ?? '')) {
        row.fields = recFields;
        edited++;
      }
      merged++;
    }

    console.log(
      `merged ${merged} permissions, ${edited} column(s) changed, ${added} new row(s) added (skipped ${skippedRole} unknown roles)`,
    );
  }

  async writeOutput() {
    await writeCsvFile(this.outputPath, this.header, this.baseRows);
    console.log(`wrote ${this.outputPath}`);
  }

  async readCedarAndWriteCsv() {
    console.log('reading base permission file');
    await this.readBasePermissionFile();
    console.log(`found ${this.baseRows.length} base permissions`);
    console.log('reading role file');
    await this.readRoleFile();
    console.log('parsing cedar policy folders');
    await this.parseAllFolders();
    console.log(
      `reconstructed ${this.reconstructed.length} permissions from cedar`,
    );
    console.log('merging into base rows');
    this.mergeIntoRows();
    console.log('writing csv');
    await this.writeOutput();
    console.log('done');
  }
}

/** CLI action: merge Cedar policies back into directus_permissions.csv. */
export async function cedarToD9(options?: CedarToD9Options): Promise<void> {
  const manager = new CedarToD9Manager(options);
  await manager.readCedarAndWriteCsv();
}
