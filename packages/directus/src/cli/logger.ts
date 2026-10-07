import pino from 'pino';
import { build as pretty } from 'pino-pretty';
import { readPlumbingConfig } from './plumbing-config';

export const logger = pino(
  { level: process.env.LOG_LEVEL ?? readPlumbingConfig().logLevel ?? 'debug' },
  pretty({ colorize: true, ignore: 'pid,hostname' }),
);
