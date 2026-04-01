import * as fs from 'fs';
import * as path from 'path';

/**
 * Patches @wbce/* dependencies in generated sample projects
 * to use file: paths pointing to the local workspace packages.
 * This allows testing generated projects locally without publishing.
 */

const packageFolders: Record<string, string> = {
  '@wbce/projen-directus': 'directus',
  '@wbce/projen-directus-extension': 'directus-extension',
  '@wbce/projen-blank': 'blank',
  '@wbce/projen-shared': 'shared',
};

const buildDirs = ['build/directus', 'build/blank'];

function findPackageJsons(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const pkgPath = path.join(dir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    results.push(pkgPath);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      results.push(...findPackageJsons(path.join(dir, entry.name)));
    }
  }
  return results;
}

for (const dir of buildDirs) {
  for (const pkgPath of findPackageJsons(dir)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    let changed = false;
    const pkgDir = path.dirname(pkgPath);

    for (const depType of ['dependencies', 'devDependencies', 'peerDependencies']) {
      if (!pkg[depType]) continue;
      for (const [name, folder] of Object.entries(packageFolders)) {
        if (pkg[depType][name]) {
          const absolutePackage = path.resolve('..', folder);
          const relativePath = path.relative(pkgDir, absolutePackage);
          pkg[depType][name] = `file:${relativePath}`;
          changed = true;
        }
      }
    }

    if (changed) {
      // projen marks generated files as read-only, make writable first
      fs.chmodSync(pkgPath, 0o644);
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
      console.log(`Patched ${pkgPath}`);
    }
  }
}
