import { rm } from 'fs/promises';
import { join } from 'path';
import { createInterface } from 'readline/promises';
import { Writable } from 'stream';
import { Cli } from './cli';
import { DbConfig } from './env';
import { saveSQLSnapshot } from './save-snapshot';
import { logger } from '../../logger';

const WORKTREE = 'node_modules/.cache/d9-plumbing/last-save';

function collect(onData: (data: string) => void) {
  return new Writable({
    write: (chunk, _encoding, next) => {
      onData(chunk.toString());
      next();
    },
  });
}

async function confirm(yes: boolean) {
  if (yes) {
    return;
  }
  if (!process.stdin.isTTY) {
    throw new Error('no TTY to confirm, use --yes to proceed');
  }
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await rl.question('Are you sure? (y/N) ');
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
    logger.warn('Non saved updates may be erased in this environment. Are you sure ?');
    await confirm(opts.yes);
    return;
  }

  logger.info(`Checking out the last save ${opts.lastSave} into a temporary worktree`);
  const cli = new Cli();
  // the worktree holds the whole repository: the project lives at the same path inside it as in the current checkout
  let prefix = '';
  await cli.command('git', ['rev-parse', '--show-prefix'], { stdout: collect((data) => prefix += data) });
  const projectInWorktree = join(WORKTREE, prefix.trim());
  await rm(WORKTREE, { recursive: true, force: true });
  await cli.command('git', ['worktree', 'prune']);
  await cli.command('git', ['worktree', 'add', '--detach', WORKTREE, opts.lastSave]);

  let status = '';
  const cwd = process.cwd();
  try {
    process.chdir(projectInWorktree);
    logger.info(`Dumping the current database to compare it with ${opts.lastSave}`);
    await saveSQLSnapshot(opts.db, { cedar: false });
    process.chdir(cwd);
    await cli.command('git', ['-C', projectInWorktree, 'status', '--porcelain', '--', 'sql'], {
      stdout: collect((data) => status += data),
    });
  } finally {
    process.chdir(cwd);
    await cli.command('git', ['worktree', 'remove', '--force', WORKTREE]);
  }

  if (status.trim()) {
    logger.error(`\n${status}`);
    throw new Error(
      'This environment has unsaved changes (see the files above). '
      + 'Run `save` from this environment, commit, merge, then run `apply-schema` again.',
    );
  }
  logger.info(`No unsaved changes since ${opts.lastSave}`);
}
