import { createHash } from 'crypto';
import { existsSync } from 'fs';
import { chmod, mkdir, rename, writeFile } from 'fs/promises';
import { join } from 'path';
import { logger } from './logger';
import { readPlumbingConfig } from './plumbing-config';

export const DEFAULT_ATLAS_VERSION = '1.3.3';

const RELEASE_SERVER = 'https://release.ariga.io/atlas';
const CACHE_DIR = './node_modules/.cache/d9-plumbing';

const PLATFORMS: Record<string, string> = { darwin: 'darwin', linux: 'linux' };
const ARCHS: Record<string, string> = { x64: 'amd64', arm64: 'arm64' };

/**
 * Name of the Atlas release file, e.g. atlas-community-linux-amd64-v1.3.3
 */
export function atlasFileName(version: string, platform: string = process.platform, arch: string = process.arch) {
  const os = PLATFORMS[platform];
  const cpu = ARCHS[arch];
  if (!os || !cpu) {
    throw new Error(`atlas is not available for ${platform}-${arch} (supported: darwin/linux, x64/arm64)`);
  }
  return `atlas-community-${os}-${cpu}-v${version}`;
}

async function download(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

/**
 * Downloads the Atlas Community Edition binary (Apache 2.0) in the version configured in d9-plumbing.json and returns its path.
 * The binary is cached in node_modules/.cache/d9-plumbing.
 */
export async function ensureAtlas(): Promise<string> {
  const config = readPlumbingConfig();
  const fileName = atlasFileName(config.atlasVersion ?? DEFAULT_ATLAS_VERSION);
  const binPath = join(CACHE_DIR, fileName);
  if (existsSync(binPath)) {
    return binPath;
  }

  logger.info(`Downloading ${fileName}`);
  const [binary, checksumFile] = await Promise.all([
    download(`${RELEASE_SERVER}/${fileName}`),
    download(`${RELEASE_SERVER}/${fileName}.sha256`),
  ]);
  const expected = checksumFile.toString().trim().split(/\s+/)[0];
  const actual = createHash('sha256').update(binary).digest('hex');
  if (actual !== expected) {
    throw new Error(`checksum mismatch for ${fileName}: expected ${expected}, got ${actual}`);
  }

  await mkdir(CACHE_DIR, { recursive: true });
  // written then renamed, so an interrupted download never leaves a broken binary in the cache
  const tmpPath = `${binPath}.tmp`;
  await writeFile(tmpPath, binary);
  await chmod(tmpPath, 0o755);
  await rename(tmpPath, binPath);
  return binPath;
}
