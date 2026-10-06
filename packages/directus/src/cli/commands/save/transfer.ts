import { existsSync } from 'fs';
import { applySQLSnapshot } from './apply-snapshot';
import { checkUnsaved } from './check-unsaved';
import { DbFlags, resolveCurrentStorage, resolveDbConfig, resolveIntermediateStorage, StorageFlags } from './env';
import { saveSQLSnapshot } from './save-snapshot';
import { syncFiles } from './sync-files';
import { cedarToD9 } from '../cedar/cedar-to-d9';

export async function save(flags: DbFlags & StorageFlags) {
  const db = await resolveDbConfig(flags);
  // after the snapshot, so that syncFiles reads the freshly dumped directus_files.csv
  await saveSQLSnapshot(db);
  await syncFiles({
    origin: await resolveCurrentStorage(flags),
    destination: await resolveIntermediateStorage(flags),
  });
}

export async function applySchema(flags: DbFlags & StorageFlags & { lastSave?: string | false; yes?: boolean }) {
  const db = await resolveDbConfig(flags);
  await syncFiles({
    origin: await resolveIntermediateStorage(flags),
    destination: await resolveCurrentStorage(flags),
  });
  await checkUnsaved({ lastSave: flags.lastSave, yes: flags.yes ?? false, db });
  if (existsSync('./permissions') && existsSync('./sql/data/directus_permissions.csv')) {
    await cedarToD9({ permissionPath: './permissions', sqlPath: './sql/data' });
  }
  await applySQLSnapshot(db);
}
