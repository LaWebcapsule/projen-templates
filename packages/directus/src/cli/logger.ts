import pino from 'pino';
import { build as pretty } from 'pino-pretty';

export const logger = pino(
  { level: process.env.LOG_LEVEL ?? 'debug' },
  pretty({ colorize: true, ignore: 'pid,hostname' }),
);
