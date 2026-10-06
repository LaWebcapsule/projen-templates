#!/usr/bin/env node
import { Command } from 'commander';
import { cedarToD9 } from './commands/cedar/cedar-to-d9';
import { d9ToCedar } from './commands/cedar/d9-to-cedar';
import { init } from './commands/init';
import { applySQLSnapshot } from './commands/save/apply-snapshot';
import { applySchema, save } from './commands/save/transfer';
import { sync } from './commands/sync';
import { logger } from './logger';

const program = new Command();

program
  .name('wbce-directus')
  .description('CLI tools for Directus project management')
  .version('0.0.1');

program
  .command('init')
  .description('Initialize a new Directus project')
  .argument('[directory]', 'target directory', '.')
  .action(init);

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

program
  .command('apply-snapshot')
  .description('Apply a SQL snapshot to a Directus database')
  .requiredOption('--host <host>', 'database host')
  .requiredOption('--user <user>', 'database user')
  .requiredOption('--password <password>', 'database password')
  .requiredOption('--database <database>', 'database name')
  .option('--ssl', 'enable SSL for database connections', false)
  .action(async (opts: { host: string; user: string; password: string; database: string; ssl: boolean }) => {
    await applySQLSnapshot({
      host: opts.host,
      user: opts.user,
      pwd: opts.password,
      database: opts.database,
      ssl: opts.ssl,
    });
  });

const collect = (value: string, previous: string[] = []) => [...previous, value];

const withTransferOptions = (command: Command) => command
  .option('--host <host>', 'database host (default: DB_HOST)')
  .option('--user <user>', 'database user (default: DB_USER)')
  .option('--password <password>', 'database password (default: DB_PASSWORD)')
  .option('--database <database>', 'database name (default: DB_DATABASE)')
  .option('--ssl', 'enable SSL for database connections (default: DB_SSL)')
  .option('--storage-config <key=value>', 'Directus storage config entry, overrides STORAGE_<LOCATION>_*, repeatable (e.g. driver=s3)', collect)
  .option('--intermediate-storage-config <key=value>', 'intermediate storage config entry, repeatable (e.g. driver=s3)', collect);

withTransferOptions(program.command('save'))
  .description('Save the SQL snapshot of the current Directus, then sync files to the intermediate storage')
  .option('--no-cedar', 'do not generate the Cedar policies from directus_permissions.csv')
  .action(save);

withTransferOptions(program.command('apply-schema'))
  .description('Sync files from the intermediate storage, then apply the SQL snapshot to the current Directus')
  .option('--last-save <commit>', 'commit of the last save of this environment, used to detect unsaved changes')
  .option('--no-last-save', 'skip the unsaved changes check')
  .option('--yes', 'do not ask for confirmation')
  .action(applySchema);

void program.parseAsync().catch((err) => {
  logger.error({ err }, 'command failed');
  process.exit(1);
});
