import { logger } from '../logger';

interface SyncOptions {
  dryRun?: boolean;
}

export async function sync(options: SyncOptions) {
  if (options.dryRun) {
    logger.info('Dry run — showing what would be synced...');
  } else {
    logger.info('Syncing Directus schema and extensions...');
  }
  // TODO: implement
}
