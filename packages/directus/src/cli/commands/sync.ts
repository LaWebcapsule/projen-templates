interface SyncOptions {
  dryRun?: boolean;
}

export async function sync(options: SyncOptions) {
  if (options.dryRun) {
    console.log('Dry run — showing what would be synced...');
  } else {
    console.log('Syncing Directus schema and extensions...');
  }
  // TODO: implement
}
