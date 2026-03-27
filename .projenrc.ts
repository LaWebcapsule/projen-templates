import { PnpmWorkspace } from '@wbce/projen-shared';
import { cdk, javascript, typescript } from 'projen';
import { Workflow } from './projenrc/workflow';

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
  depsUpgradeOptions: { workflow: false },
  devDeps: [
    '@changesets/cli',
    '@types/node',
    '@wbce/projen-shared@workspace:*',
  ],
});

// NPM config
root.package.addField('packageManager', 'pnpm@10.30.3');
root.npmrc.addConfig('auto-install-peers', 'true');
root.npmrc.addConfig('link-workspace-packages', 'true');

// CI publish script
root.addTask('ci:publish', {
  exec: 'pnpm publish -r',
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
shared.postCompileTask.exec('cp -r src/templates lib/');

// --- blank ---
new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/blank',
  name: '@wbce/projen-blank',
  peerDeps: ['constructs', 'projen', '@wbce/projen-shared'],
  devDeps: ['@wbce/projen-shared@workspace:*'],
});

// --- directus ---
new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/directus',
  name: '@wbce/projen-directus',
  peerDeps: ['constructs', 'projen', '@wbce/projen-shared', '@wbce/projen-directus-extension'],
  devDeps: ['@wbce/projen-shared@workspace:*', '@wbce/projen-directus-extension@workspace:*'],
});


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
directusExtension.postCompileTask.exec('cp -r templates lib/');


// --- keycloak ---
new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/keycloak',
  name: '@wbce/projen-keycloak',
  peerDeps: ['constructs', 'projen'],
});

// --- react ---
new cdk.JsiiProject({
  ...commonJsiiOptions,
  parent: root,
  outdir: './packages/react',
  name: '@wbce/projen-react',
  peerDeps: ['constructs', 'projen'],
});

// ─── Custom components (order matters: after subprojects are defined) ────────

new PnpmWorkspace(root);
new Workflow(root);

// ─── Synthesize ──────────────────────────────────────────────────────────────

root.synth();
