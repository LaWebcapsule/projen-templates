import { existsSync, readFileSync } from 'fs';
import type { DriverConfig } from '@wbce-d9/storage';

export interface DbConfig {
  host: string;
  user: string;
  pwd: string;
  database: string;
  ssl?: boolean;
}

export interface DbFlags {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  ssl?: boolean;
}

export interface StorageFlags {
  storageConfig?: string[];
  intermediateStorageConfig?: string[];
}

interface IntermediateStorageFile {
  driver?: string;
  options?: Record<string, string>;
  secretEnv?: Record<string, string>;
}

const INTERMEDIATE_STORAGE_FILE = './intermediate-storage.json';

// @wbce-d9/api is not a dependency of this package: it is resolved from the user's Directus project.
// Specifiers are kept in variables so tsc does not try to resolve them.
const envModule = '@wbce-d9/api/env';
const configFromEnvModule = '@wbce-d9/api/utils/get-config-from-env';

async function loadDirectusEnv() {
  const { getEnv } = (await import(envModule)) as { getEnv: () => Record<string, any> };
  const { getConfigFromEnv } = (await import(configFromEnvModule)) as {
    getConfigFromEnv: (prefix: string) => Record<string, any>;
  };
  return { env: getEnv(), getConfigFromEnv };
}

export async function resolveDbConfig(flags: DbFlags): Promise<DbConfig> {
  const { env } = await loadDirectusEnv();
  const config = {
    host: flags.host ?? env.DB_HOST,
    user: flags.user ?? env.DB_USER,
    pwd: flags.password ?? env.DB_PASSWORD,
    database: flags.database ?? env.DB_DATABASE,
    ssl: flags.ssl ?? Boolean(env.DB_SSL),
  };
  const missing = Object.entries(config).filter(([, value]) => value === undefined).map(([key]) => key);
  if (missing.length > 0) {
    throw new Error(`missing database configuration: ${missing.join(', ')} (use flags or DB_* environment variables)`);
  }
  return config;
}

function toDriverConfig({ driver, ...options }: Record<string, any>): DriverConfig {
  return { driver, options };
}

export async function resolveCurrentStorage(flags: StorageFlags): Promise<DriverConfig> {
  const { env, getConfigFromEnv } = await loadDirectusEnv();
  const location = String(env.STORAGE_LOCATIONS ?? '').split(',')[0].trim();
  const config = location ? getConfigFromEnv(`STORAGE_${location.toUpperCase()}_`) : {};
  applyConfigFlags(config, '--storage-config', flags.storageConfig);
  if (!config.driver) {
    throw new Error('no storage driver found (use STORAGE_LOCATIONS and STORAGE_<LOCATION>_DRIVER or --storage-config driver=...)');
  }
  return toDriverConfig(config);
}

function setPath(target: Record<string, any>, path: string, value: string) {
  const keys = path.split('.');
  const last = keys.pop()!;
  let current = target;
  for (const key of keys) {
    current[key] = current[key] ?? {};
    current = current[key];
  }
  current[last] = value;
}

function applyConfigFlags(config: Record<string, any>, flag: string, entries: string[] = []) {
  for (const entry of entries) {
    const separator = entry.indexOf('=');
    if (separator === -1) {
      throw new Error(`invalid ${flag} "${entry}", expected key=value`);
    }
    setPath(config, entry.slice(0, separator), entry.slice(separator + 1));
  }
}

export async function resolveIntermediateStorage(flags: StorageFlags): Promise<DriverConfig> {
  const { env, getConfigFromEnv } = await loadDirectusEnv();
  let config: Record<string, any> = {};

  if (existsSync(INTERMEDIATE_STORAGE_FILE)) {
    const file: IntermediateStorageFile = JSON.parse(readFileSync(INTERMEDIATE_STORAGE_FILE).toString());
    config = { driver: file.driver, ...file.options };
    for (const [key, envName] of Object.entries(file.secretEnv ?? {})) {
      config[key] = env[envName];
    }
  }

  config = { ...config, ...getConfigFromEnv('INTERMEDIATE_STORAGE_') };

  applyConfigFlags(config, '--intermediate-storage-config', flags.intermediateStorageConfig);

  if (!config.driver) {
    throw new Error(`no intermediate storage driver found (use ${INTERMEDIATE_STORAGE_FILE}, INTERMEDIATE_STORAGE_DRIVER or --intermediate-storage-config driver=...)`);
  }
  return toDriverConfig(config);
}
