#!/usr/bin/env node
import { Command } from 'commander';
import { cedarToD9 } from './commands/cedar/cedar-to-d9';
import { d9ToCedar } from './commands/cedar/d9-to-cedar';
import { applySchema, checkUnsavedChanges, firstImport, pullFiles, pushFiles, save } from './commands/save/transfer';
import { sync } from './commands/sync';
import { logger } from './logger';

const program = new Command();

program
  .name('d9-plumbing')
  .description('CLI tools for Directus project management')
  .version('0.0.1');

program
  .command('sync')
  .description('Sync Directus schema and extensions')
  .option('--dry-run', 'show what would be synced without making changes')
  .action(sync);

program
  .command('cedar-to-d9')
  .description('Merge Cedar policies back into directus_permissions.csv')
  .option('--permissions <path>', 'path to the permissions folder', './permissions')
  .option('--sql <path>', 'path to the sql/data folder', './sql/data')
  .option('--output <path>', 'output CSV path (defaults to rewriting directus_permissions.csv in place)')
  .action(async (opts: { permissions: string; sql: string; output?: string }) => {
    await cedarToD9({
      permissionPath: opts.permissions,
      sqlPath: opts.sql,
      outputPath: opts.output,
    });
  });

program
  .command('d9-to-cedar')
  .description('Generate the Cedar policy folders from directus_permissions.csv')
  .option('--permissions <path>', 'path to the permissions folder', './permissions')
  .option('--sql <path>', 'path to the sql/data folder', './sql/data')
  .action(async (opts: { permissions: string; sql: string }) => {
    await d9ToCedar({
      permissionPath: opts.permissions,
      sqlPath: opts.sql,
    });
  });

const collect = (value: string, previous: string[] = []) => [...previous, value];

const withDbOptions = (command: Command) => command
  .option('--host <host>', 'database host (default: DB_HOST)')
  .option('--user <user>', 'database user (default: DB_USER)')
  .option('--password <password>', 'database password (default: DB_PASSWORD)')
  .option('--database <database>', 'database name (default: DB_DATABASE)')
  .option('--ssl', 'enable SSL for database connections (default: DB_SSL)');

const withStorageOptions = (command: Command) => command
  .option('--storage-config <key=value>', 'Directus storage config entry, overrides STORAGE_<LOCATION>_*, repeatable (e.g. driver=s3)', collect)
  .option('--intermediate-storage-config <key=value>', 'intermediate storage config entry, repeatable (e.g. driver=s3)', collect);

const withCheckOptions = (command: Command) => command
  .option('--last-save <commit>', 'commit of the last save of this environment, used to detect unsaved changes')
  .option('--no-last-save', 'skip the unsaved changes check')
  .option('--yes', 'do not ask for confirmation');

withStorageOptions(program.command('push-files'))
  .description('Sync the files listed in directus_files.csv from the current storage to the intermediate storage')
  .action(pushFiles);

withStorageOptions(program.command('pull-files'))
  .description('Sync the files listed in directus_files.csv from the intermediate storage to the current storage')
  .action(pullFiles);

withCheckOptions(withDbOptions(program.command('check-unsaved')))
  .description('Fail if the current Directus differs from the --last-save commit')
  .action(checkUnsavedChanges);

withStorageOptions(withDbOptions(program.command('first-import')))
  .description('Apply the SQL snapshot of ./sql to an empty Directus database, then sync files from the intermediate storage if one is configured')
  .action(firstImport);

withStorageOptions(withDbOptions(program.command('save')))
  .description('Save the SQL snapshot of the current Directus, then sync files to the intermediate storage')
  .option('--no-cedar', 'do not generate the Cedar policies from directus_permissions.csv')
  .action(save);

withCheckOptions(withStorageOptions(withDbOptions(program.command('apply-schema'))))
  .description('Sync files from the intermediate storage, then apply the SQL snapshot to the current Directus')
  .action(applySchema);

void program.parseAsync().catch((err) => {
  logger.error({ err }, 'command failed');
  process.exit(1);
});
