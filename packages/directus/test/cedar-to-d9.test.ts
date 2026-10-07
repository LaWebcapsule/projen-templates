import { mkdtempSync, mkdirSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import * as cedar from '@cedar-policy/cedar-wasm/nodejs';
import { cedarToD9 } from '../src/cli/commands/cedar/cedar-to-d9';
import { expandPolicy } from '../src/cli/commands/cedar/cedar-to-d9-translations';
import { d9ToCedar } from '../src/cli/commands/cedar/d9-to-cedar';
import { readCsvFile } from '../src/cli/commands/save/utils';

const EDITOR = '22222222-2222-2222-2222-222222222222';
const HEADER = 'action,collection,fields,id,permissions,presets,role,validation';
const ROWS = {
  editorRead: `read,articles,*,1,{},,${EDITOR},{}`,
  editorUpdate: `update,articles,"title,body",2,{"status":{"_eq":"draft"}},,${EDITOR},{}`,
  publicRead: 'read,articles,*,3,{},,,{}',
};

function writeSqlFolder(dir: string, rows: string[]) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'directus_roles.csv'), `id,name\n${EDITOR},Editor\n`);
  writeFileSync(join(dir, 'directus_permissions.csv'), [HEADER, ...rows].join('\n') + '\n');
}

test('cedar-to-d9 removes the rows no longer present in the Cedar policies', async () => {
  const root = mkdtempSync(join(tmpdir(), 'cedar-to-d9-'));
  const permissionPath = join(root, 'permissions');

  // Cedar policies generated without the Editor read permission...
  const withoutRead = join(root, 'without-read');
  writeSqlFolder(withoutRead, [ROWS.editorUpdate, ROWS.publicRead]);
  await d9ToCedar({ permissionPath, sqlPath: withoutRead });

  // ...merged back into the CSV that still holds it.
  const sqlPath = join(root, 'sql');
  writeSqlFolder(sqlPath, Object.values(ROWS));
  await cedarToD9({ permissionPath, sqlPath });

  const rows = await readCsvFile(join(sqlPath, 'directus_permissions.csv'));
  expect(rows.map((row) => [row.id, row.role, row.action])).toEqual([
    ['2', EDITOR, 'update'],
    ['3', '', 'read'],
  ]);
});

describe('expandPolicy', () => {
  const expand = (action: string) => {
    const parsed = cedar.policyToJson(`permit (principal, ${action}, resource);`);
    if (parsed.type === 'failure') throw new Error(JSON.stringify(parsed.errors));
    return expandPolicy(parsed.json).map((tuple) => `${tuple.collection}/${tuple.action}`);
  };

  test('expands the action constraints written by d9-to-cedar', () => {
    expect(expand('action == Db::articles::Action::"read"')).toEqual(['articles/read']);
    expect(expand('action in [Db::articles::Action::"read", Db::articles::Action::"update"]')).toEqual([
      'articles/read',
      'articles/update',
    ]);
  });

  test('expands a single-element action list', () => {
    expect(expand('action in [Db::articles::Action::"read"]')).toEqual(['articles/read']);
  });

  test('throws on an unexpected action constraint', () => {
    expect(() => expand('action')).toThrow('Unexpected action constraint');
  });
});
