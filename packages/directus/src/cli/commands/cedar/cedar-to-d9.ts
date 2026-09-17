import { existsSync } from 'fs';
import { readFile, readdir } from 'fs/promises';
import * as cedar from '@cedar-policy/cedar-wasm/nodejs';
import {
  expandPolicy,
  exprToFilter,
  extractFields,
} from './cedar-to-d9-translations';
import { D9Permission } from './d9-permission';
import { RolesTable } from './roles-table';
import { readCsvFile, readFirstLineOfFile, writeCsvFile } from '../save/utils';

/** Map keyed by a tuple of strings (Map indexes arrays by identity, hence the join). */
class TupleKeyMap<Value> {
  private readonly entries = new Map<string, Value>();

  /** `createValue` is required to use {@link getOrCreate}; omit it for a plain get/set map. */
  constructor(private readonly createValue?: (parts: string[]) => Value) {}

  private keyOf(parts: string[]): string {
    return parts.join(' ');
  }

  public get(parts: string[]) {
    return this.entries.get(this.keyOf(parts));
  }

  public set(parts: string[], value: Value): void {
    this.entries.set(this.keyOf(parts), value);
  }

  /** Return the value for `parts`, creating and storing it via the factory if absent. */
  public getOrCreate(parts: string[]): Value {
    const key = this.keyOf(parts);
    let value = this.entries.get(key);
    if (value === undefined) {
      if (!this.createValue) {
        throw new Error('TupleKeyMap.getOrCreate called without a factory');
      }
      value = this.createValue(parts);
      this.entries.set(key, value);
    }
    return value;
  }

  public values(): Value[] {
    return [...this.entries.values()];
  }
}

/**
 * Reverse of d9-to-cedar: reads the per-role Cedar policy files back into D9
 * permission rows and merges them into directus_permissions.csv. The original
 * CSV stays the source of truth for the columns Cedar does not carry (`id`,
 * `role` UUID, `presets`); only `permissions`/`fields`/`validation` are rewritten.
 */
export class CedarToD9Manager {
  public permissionPath: string;
  public sqlPath: string;
  public outputPath: string;

  public roles!: RolesTable;
  // Rows keyed by (role, collection, action); the map's values (insertion order)
  // are what gets written back out, so it is the single source of truth for rows.
  public baseRowsByTuple = new TupleKeyMap<Record<string, string>>();
  public header: string[] = [];
  public nextId = 0;
  public reconstructed: D9Permission[] = [];

  constructor(opts?: {
    permissionPath?: string;
    sqlPath?: string;
    outputPath?: string;
  }) {
    this.permissionPath = opts?.permissionPath || './permissions';
    this.sqlPath = opts?.sqlPath || './sql/data';
    this.outputPath =
      opts?.outputPath || `${this.sqlPath}/directus_permissions.csv`;
  }

  public async readBasePermissionFile() {
    const filePath = `${this.sqlPath}/directus_permissions.csv`;
    const rows = await readCsvFile(filePath);
    const firstLine = await readFirstLineOfFile(filePath);
    this.header = firstLine.split(',').map((column) => column.trim());

    for (const row of rows) {
      this.baseRowsByTuple.set([row.role, row.collection, row.action], row);
      const id = Number(row.id);
      if (Number.isFinite(id) && id > this.nextId) this.nextId = id;
    }
  }

  public async readRoleFile() {
    this.roles = await RolesTable.load(this.sqlPath);
  }

  /** Read one `.cedar` file into expanded (collection, action, conditions) tuples. */
  public async parseCedarFile(
    filePath: string,
  ): Promise<Array<{ collection: string; action: string; conditions: any[] }>> {
    if (!existsSync(filePath)) {
      return []; // a role may not have every .cedar file (e.g. no validate.cedar)
    }
    const text = (await readFile(filePath)).toString();
    const parts = cedar.policySetTextToParts(text);
    if (parts.type === 'failure') {
      console.error(`failed to split policy set ${filePath}`);
      throw new Error(parts.errors as any);
    }
    const tuples: Array<{
      collection: string;
      action: string;
      conditions: any[];
    }> = [];
    for (const policyText of parts.policies) {
      const parsed = cedar.policyToJson(policyText);
      if (parsed.type === 'failure') {
        console.error(`failed to parse policy in ${filePath}`);
        console.error(policyText);
        throw new Error(parsed.errors as any);
      }
      tuples.push(...expandPolicy(parsed.json));
    }
    return tuples;
  }

  public async parseRoleFolder(roleName: string): Promise<D9Permission[]> {
    // A (collection, action) tuple can appear across authorize/check-fields/validate,
    // so the map creates one permission per tuple and we accumulate clauses onto it.
    const byTuple = new TupleKeyMap<D9Permission>(([collection, action]) =>
      D9Permission.empty(roleName, collection, action),
    );

    const folder = `${this.permissionPath}/${roleName}`;

    const authorizeTuples = await this.parseCedarFile(
      `${folder}/authorize.cedar`,
    );
    for (const tuple of authorizeTuples) {
      byTuple.getOrCreate([tuple.collection, tuple.action]).permissions =
        exprToFilter(tuple.conditions[0]?.body, 'resource');
    }

    const fieldTuples = await this.parseCedarFile(`${folder}/check-fields.cedar`);
    for (const tuple of fieldTuples) {
      if (tuple.conditions.length) {
        byTuple.getOrCreate([tuple.collection, tuple.action]).fields =
          extractFields(tuple.conditions[0].body);
      }
    }

    const validateTuples = await this.parseCedarFile(`${folder}/validate.cedar`);
    for (const tuple of validateTuples) {
      if (tuple.conditions.length) {
        byTuple.getOrCreate([tuple.collection, tuple.action]).validation =
          exprToFilter(tuple.conditions[0].body, 'context.newValue');
      }
    }

    return byTuple.values();
  }

  public async parseAllFolders() {
    const entries = await readdir(this.permissionPath, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      this.reconstructed.push(...(await this.parseRoleFolder(entry.name)));
    }
  }

  public mergeIntoRows() {
    let merged = 0;
    let updated = 0;
    let added = 0;

    for (const perm of this.reconstructed) {
      const roleId = this.roles.getIdFromName(perm.roleName);
      if (!roleId && perm.roleName !== 'Public') {
        // In V2, instead of throwing an error, we could create a new role in the CSV.
        // But for now, we expect the roles to be pre-defined in the CSV.
        // This is a sanity check: the role should exist in the CSV, otherwise something is wrong.
        throw new Error(
          `role "${perm.roleName}" (from ${this.permissionPath}) not found in directus_roles.csv`,
        );
      }

      const row = this.baseRowsByTuple.get([roleId!, perm.collection, perm.action]);
      if (!row) {
        // New tuple added in the Cedar files; the role exists, so create a row.
        const newRow: Record<string, string> = {
          id: String(++this.nextId),
          role: roleId!,
          collection: perm.collection,
          action: perm.action,
          permissions: perm.permissionsCell(),
          validation: perm.validationCell(),
          fields: perm.fieldsCell(),
          presets: '',
        };
        this.baseRowsByTuple.set([roleId!, perm.collection, perm.action], newRow);
        console.log(
          `added ${perm.roleName}/${perm.collection}/${perm.action} (id ${newRow.id})`,
        );
        added++;
        merged++;
        continue;
      }

      // The Cedar policies are the source of truth: overwrite the three
      // derivable columns directly (the round-trip is meaning-preserving, so
      // this only reshapes representation, e.g. `{_and:[x]}` -> `x`).
      row.permissions = perm.permissionsCell();
      row.validation = perm.validationCell();
      row.fields = perm.fieldsCell();
      updated++;
      merged++;
    }

    console.log(
      `merged ${merged} permissions, ${updated} row(s) updated, ${added} new row(s) added`,
    );
  }

  public async writeOutput() {
    await writeCsvFile(
      this.outputPath,
      this.header,
      this.baseRowsByTuple.values(),
    );
    console.log(`wrote ${this.outputPath}`);
  }

  public async readCedarAndWriteCsv() {
    console.log('reading base permission file');
    await this.readBasePermissionFile();
    console.log(`found ${this.baseRowsByTuple.values().length} base permissions`);
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
export async function cedarToD9(options?: {
  permissionPath?: string;
  sqlPath?: string;
  outputPath?: string;
}): Promise<void> {
  const manager = new CedarToD9Manager(options);
  await manager.readCedarAndWriteCsv();
}
