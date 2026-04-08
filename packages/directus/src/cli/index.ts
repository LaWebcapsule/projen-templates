#!/usr/bin/env node
import { Command } from 'commander';
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

program.parse();
