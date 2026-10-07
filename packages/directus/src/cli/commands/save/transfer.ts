import * as pg from 'pg';
import { applySQLSnapshot } from './apply-snapshot';
import { checkUnsaved } from './check-unsaved';
import { DbConfig, DbFlags, findIntermediateStorage, resolveCurrentStorage, resolveDbConfig, resolveIntermediateStorage, StorageFlags } from './env';
import { saveSQLSnapshot } from './save-snapshot';
import { syncFiles } from './sync-files';
import { logger } from '../../logger';

type CheckFlags = { lastSave?: string | false; yes?: boolean };

export async function saveSqlSchema(flags: DbFlags & { cedar?: boolean }) {
  await saveSQLSnapshot(await resolveDbConfig(flags), { cedar: flags.cedar });
}

export async function applySqlSchema(flags: DbFlags) {
  await applySQLSnapshot(await resolveDbConfig(flags));
}

export async function pushFiles(flags: StorageFlags) {
  await syncFiles({
    origin: await resolveCurrentStorage(flags),
    destination: await resolveIntermediateStorage(flags),
  });
}

export async function pullFiles(flags: StorageFlags) {
  await syncFiles({
    origin: await resolveIntermediateStorage(flags),
    destination: await resolveCurrentStorage(flags),
  });
}

export async function checkUnsavedChanges(flags: DbFlags & CheckFlags) {
  await checkUnsaved({ lastSave: flags.lastSave, yes: flags.yes ?? false, db: await resolveDbConfig(flags) });
}

export async function save(flags: DbFlags & StorageFlags & { cedar?: boolean }) {
  // after the snapshot, so that syncFiles reads the freshly dumped directus_files.csv
  await saveSqlSchema(flags);
  await pushFiles(flags);
}

export async function applySchema(flags: DbFlags & StorageFlags & CheckFlags) {
  await pullFiles(flags);
  await checkUnsavedChanges(flags);
  await applySqlSchema(flags);
}

async function isDatabaseEmpty(db: DbConfig) {
  const client = new pg.Client({
    user: db.user,
    host: db.host,
    password: db.pwd,
    database: db.database,
    ...(db.ssl ? { ssl: { rejectUnauthorized: false } } : {}),
  });
  await client.connect();
  try {
    const { rows } = await client.query(
      "SELECT count(*)::int AS count FROM information_schema.tables WHERE table_name LIKE 'directus\\_%'",
    );
    return rows[0].count === 0;
  } finally {
    await client.end();
  }
}

export async function firstImport(flags: DbFlags & StorageFlags) {
  const db = await resolveDbConfig(flags);
  if (!(await isDatabaseEmpty(db))) {
    logger.warn('The database is not empty, skipping the first import');
    return;
  }
  await applySQLSnapshot(db);
  const intermediate = await findIntermediateStorage(flags);
  if (!intermediate) {
    logger.info('No intermediate storage configured, skipping the file sync');
    return;
  }
  await syncFiles({ origin: intermediate, destination: await resolveCurrentStorage(flags) });
}
