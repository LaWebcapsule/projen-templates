import { rm } from 'fs/promises';
import { createInterface } from 'readline/promises';
import { Writable } from 'stream';
import { Cli } from './cli';
import { DbConfig } from './env';
import { saveSQLSnapshot } from './save-snapshot';
import { logger } from '../../logger';

const WORKTREE = 'node_modules/.cache/wbce-d9/last-save';

async function confirm(yes: boolean) {
  if (yes) {
    return;
  }
  if (!process.stdin.isTTY) {
    throw new Error('no TTY to confirm, use --yes to proceed');
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question('Êtes-vous sûr ? (y/N) ');
    if (answer.trim().toLowerCase() !== 'y') {
      throw new Error('aborted');
    }
  } finally {
    rl.close();
  }
}

/**
 * Dumps the destination into a worktree checked out at `lastSave`, and fails if the dump differs from that commit.
 */
export async function checkUnsaved(opts: { lastSave?: string | false; yes: boolean; db: DbConfig }) {
  if (opts.lastSave === undefined) {
    throw new Error('--last-save <commit> is required (or --no-last-save to bypass the check)');
  }
  if (opts.lastSave === false) {
    logger.warn('Des modifications non sauvegardées vont probablement être écrasées sur cet environnement.');
    await confirm(opts.yes);
    return;
  }

  const cli = new Cli();
  await rm(WORKTREE, { recursive: true, force: true });
  await cli.command('git', ['worktree', 'prune']);
  await cli.command('git', ['worktree', 'add', '--detach', WORKTREE, opts.lastSave]);

  let status = '';
  const cwd = process.cwd();
  try {
    process.chdir(WORKTREE);
    await saveSQLSnapshot(opts.db);
    process.chdir(cwd);
    await cli.command('git', ['-C', WORKTREE, 'status', '--porcelain', '--', 'sql', 'permissions'], {
      stdout: new Writable({
        write: (chunk, _encoding, next) => {
          status += chunk.toString();
          next();
        },
      }),
    });
  } finally {
    process.chdir(cwd);
    await cli.command('git', ['worktree', 'remove', '--force', WORKTREE]);
  }

  if (status.trim()) {
    logger.error(`\n${status}`);
    throw new Error(
      'Vous avez des modifications non sauvegardées sur cet environnement (diff ci-dessus). '
      + 'Lancez `save` depuis cet environnement, commit, merge, puis relancez `apply-schema`.',
    );
  }
}
