#!/usr/bin/env node
import { Command } from 'commander';
import { cedarToD9 } from './commands/cedar-to-d9';
import { init } from './commands/init';
import { applySQLSnapshot } from './commands/save/apply-snapshot';
import { sync } from './commands/sync';

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
  .option('--output <path>', 'output CSV path (ignored when --overwrite)')
  .option('--overwrite', 'overwrite directus_permissions.csv in place', false)
  .action(async (opts: { permissions: string; sql: string; output?: string; overwrite: boolean }) => {
    await cedarToD9({
      permissionPath: opts.permissions,
      sqlPath: opts.sql,
      outputPath: opts.output,
      overwrite: opts.overwrite,
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

void program.parseAsync().catch((err) => {
  console.error(err);
  process.exit(1);
});
