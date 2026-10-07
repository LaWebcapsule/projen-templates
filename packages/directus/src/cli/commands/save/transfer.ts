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
  const db = await resolveDbConfig(flags);
  const origin = await resolveCurrentStorage(flags);
  const destination = await resolveIntermediateStorage(flags);

  // after the snapshot, so that syncFiles reads the freshly dumped directus_files.csv
  logger.info(`[1/2] Saving the SQL snapshot of ${describeDb(db)} into ./sql`);
  await saveSQLSnapshot(db, { cedar: flags.cedar });
  logger.info(`[2/2] Pushing files to the intermediate storage (${origin.driver} → ${destination.driver})`);
  await syncFiles({ origin, destination });
  logger.info('Save completed');
}

export async function applySchema(flags: DbFlags & StorageFlags & CheckFlags) {
  const db = await resolveDbConfig(flags);
  const origin = await resolveIntermediateStorage(flags);
  const destination = await resolveCurrentStorage(flags);

  logger.info(`[1/3] Checking for unsaved changes on ${describeDb(db)}`);
  await checkUnsaved({ lastSave: flags.lastSave, yes: flags.yes ?? false, db });
  logger.info(`[2/3] Pulling files from the intermediate storage (${origin.driver} → ${destination.driver})`);
  await syncFiles({ origin, destination });
  logger.info(`[3/3] Applying the SQL snapshot to ${describeDb(db)}`);
  await applySQLSnapshot(db);
  logger.info('Schema applied');
}

function describeDb(db: DbConfig) {
  return `${db.database}@${db.host}`;
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
