import type { DriverConfig } from '@wbce-d9/storage';
import { readCsvFile } from './utils';
import { logger } from '../../logger';

const drivers: Record<string, string> = {
  local: '@wbce-d9/storage-driver-local',
  s3: '@wbce-d9/storage-driver-s3',
  gcs: '@wbce-d9/storage-driver-gcs',
  azure: '@wbce-d9/storage-driver-azure',
  cloudinary: '@wbce-d9/storage-driver-cloudinary',
};

export async function syncFiles(opts: { origin: DriverConfig; destination: DriverConfig }) {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { StorageManager } = await import('@wbce-d9/storage');
  const storage = new StorageManager();
  for (const { driver } of [opts.origin, opts.destination]) {
    storage.registerDriver(driver, (await import(drivers[driver])).default);
  }
  storage.registerLocation('origin', opts.origin);
  storage.registerLocation('destination', opts.destination);
  const origin = storage.location('origin');
  const destination = storage.location('destination');

  const files = await readCsvFile('./sql/data/directus_files.csv');
  logger.info(`will deal with ${files.length} files`);
  for (const { filename_disk: fileId } of files) {
    if (await destination.exists(fileId)) {
      logger.info(`${fileId} already exists in destination`);
      continue;
    }
    if (!(await origin.exists(fileId))) {
      logger.info(`${fileId} does not exist in origin`);
      continue;
    }
    await destination.write(fileId, await origin.read(fileId));
    logger.info(`${fileId} synced`);
  }
}
