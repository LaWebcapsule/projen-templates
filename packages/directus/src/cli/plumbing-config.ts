import { existsSync, readFileSync } from 'fs';

export interface PlumbingConfig {
  intermediateStorage?: {
    driver?: string;
    options?: Record<string, string>;
    secretEnv?: Record<string, string>;
  };
  logLevel?: string;
}

export const PLUMBING_CONFIG_FILE = './d9-plumbing.json';

export function readPlumbingConfig(): PlumbingConfig {
  if (!existsSync(PLUMBING_CONFIG_FILE)) {
    return {};
  }
  return JSON.parse(readFileSync(PLUMBING_CONFIG_FILE).toString());
}
