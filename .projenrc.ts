import * as fs from 'fs';
import * as path from 'path';
import { PnpmWorkspace } from '@wbce/projen-shared';
import { cdk, javascript, typescript } from 'projen';
import { Workflow } from './projenrc/workflow';

/** Read the current version from an existing package.json so changesets-managed versions survive projen synth. */
function readPackageVersion(outdir: string): string {
  try {
    const pkgPath = path.join(outdir, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    if (pkg.version && pkg.version !== '0.0.0') {
      return pkg.version;
    }
    // Fallback: read latest version from CHANGELOG.md (written by changesets)
    const changelogPath = path.join(outdir, 'CHANGELOG.md');
    const changelog = fs.readFileSync(changelogPath, 'utf-8');
    const match = changelog.match(/^## (\d+\.\d+\.\d+)/m);
    if (match) {
      return match[1];
    }
  } catch {
    // ignore
  }
  return '0.0.0';
}

// ─── Constants ───────────────────────────────────────────────────────────────

const defaultReleaseBranch = 'main';
const jsiiVersion = '~5.9.0';
const repositoryUrl = 'git@github.com:LaWebcapsule/projen-templates.git';
const author = 'webcapsule';
const authorAddress = 'support@wbce.io';
const license = 'GPL-3.0-or-later';

// ─── Shared options for all JsiiProject subprojects ─────────────────────────

const commonJsiiOptions = {
  author,
  authorAddress,
  defaultReleaseBranch,
  jsiiVersion,
  repositoryUrl,
  license,
  licensed: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  packageManager: javascript.NodePackageManager.PNPM,
  github: false, // Managed at root level
  buildWorkflow: false, // NX handles builds
  release: false, // Changesets handles releases
  depsUpgradeOptions: { workflow: false },
};

// ─── Root project ────────────────────────────────────────────────────────────

const root = new typescript.TypeScriptProject({
  name: '@wbce/root',
  packageManager: javascript.NodePackageManager.PNPM,
  defaultReleaseBranch,
  projenrcTs: true,
  eslint: false,
  jest: false,
  sampleCode: false,
  buildWorkflow: false,
  release: false,
  disableTsconfig: true,
  depsUpgradeOptions: { workflow: false },
  devDeps: [
    '@changesets/cli',
    '@types/node',
    '@wbce/projen-shared@workspace:*',
  ],
});
root.compileTask.reset();

// NPM config
root.package.addField('packageManager', 'pnpm@10.30.3');
root.npmrc.addConfig('auto-install-peers', 'true');
root.npmrc.addConfig('link-workspace-packages', 'true');

// CI publish script
root.addTask('ci:publish', {
  exec: "pnpm publish -r --filter '!@wbce/sample'",
});

// ─── Packages ────────────────────────────────────────────────────────────────

// --- shared ---
const shared = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/shared',
  name: '@wbce/projen-shared',
  peerDeps: ['constructs', 'projen'],
});
shared.package.addVersion(readPackageVersion('./packages/shared'));
shared.postCompileTask.exec('cp -r src/templates lib/');

// --- blank ---
const blank = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/blank',
  name: '@wbce/projen-blank',
  peerDeps: ['constructs', 'projen', '@wbce/projen-shared'],
  devDeps: ['@wbce/projen-shared@workspace:*'],
});
blank.package.addVersion(readPackageVersion('./packages/blank'));

// --- directus ---
const directus = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/directus',
  name: '@wbce/projen-directus',
  peerDeps: ['constructs', 'projen', '@wbce/projen-shared', '@wbce/projen-directus-extension'],
  devDeps: ['@wbce/projen-shared@workspace:*', '@wbce/projen-directus-extension@workspace:*'],
});
directus.package.addVersion(readPackageVersion('./packages/directus'));
directus.npmrc.addConfig('node-linker', 'hoisted');
directus.addBundledDeps("commander");
directus.addBundledDeps("pg");
directus.addBundledDeps("pg-copy-streams");
directus.addBundledDeps("@types/pg");
directus.addBundledDeps("@types/pg-copy-streams");


// --- directus extension ---
const directusExtension = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/directus-extension',
  name: '@wbce/projen-directus-extension',
  peerDeps: ['constructs', 'projen', '@wbce/projen-shared'],
  devDeps: ['@wbce/projen-shared@workspace:*'],
  bundledDeps: ['tsx'],
});
directusExtension.package.addVersion(readPackageVersion('./packages/directus-extension'));
directusExtension.npmrc.addConfig('node-linker', 'hoisted');
directusExtension.postCompileTask.exec('cp -r templates lib/');


// --- keycloak ---
const keycloak = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/keycloak',
  name: '@wbce/projen-keycloak',
  peerDeps: ['constructs', 'projen'],
});
keycloak.package.addVersion(readPackageVersion('./packages/keycloak'));

// --- react ---
const react = new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/react',
  name: '@wbce/projen-react',
  peerDeps: ['constructs', 'projen'],
});
react.package.addVersion(readPackageVersion('./packages/react'));

// --- sample ---
const sample = new typescript.TypeScriptProject({
  parent: root,
  outdir: './packages/sample',
  name: '@wbce/sample',
  defaultReleaseBranch,
  packageManager: javascript.NodePackageManager.PNPM,
  eslint: false,
  jest: false,
  sampleCode: false,
  buildWorkflow: false,
  release: false,
  disableTsconfig: true,
  depsUpgradeOptions: { workflow: false },
  github: false,
  devDeps: [
    '@wbce/projen-blank@workspace:*',
    '@wbce/projen-directus@workspace:*',
  ],
  deps: ['tsx'],
});
sample.compileTask.reset();
sample.package.addField('private', true);
sample.addTask('synth', { exec: 'tsx index.ts' });

// Task to test generated projects locally by patching @wbce/* deps to file: paths
const testTask = sample.addTask('test:local', {
  description: 'Synth sample projects and install deps using local packages',
});
testTask.exec('tsx index.ts');
testTask.exec('tsx patch-local-deps.ts');
testTask.exec('cd build/directus && npm install');
testTask.exec('cd build/directus/extension-packages/test && npm install');

// ─── Custom components (order matters: after subprojects are defined) ────────

new PnpmWorkspace(root);
new Workflow(root);

// ─── Synthesize ──────────────────────────────────────────────────────────────

root.synth();
