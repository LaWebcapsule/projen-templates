import * as fs from 'fs';
import * as path from 'path';
import { GitHubConfig, GitHubConfigOptions } from '@wbce/projen-shared';
import { javascript, SampleFile, typescript } from 'projen';

// In dev (src/), templates are at ../templates. In production (lib/), they're at ./templates (copied by postCompile).
const TEMPLATES_DIR = fs.existsSync(path.join(__dirname, 'templates'))
  ? path.join(__dirname, 'templates')
  : path.join(__dirname, '..', 'templates');

function readTemplate(type: string): string {
  return fs.readFileSync(path.join(TEMPLATES_DIR, `${type}.ts`), 'utf-8');
}

/**
 * Supported Directus v9 extension types.
 */
export enum DirectusExtensionType {
  INTERFACE = 'interface',
  DISPLAY = 'display',
  LAYOUT = 'layout',
  MODULE = 'module',
  PANEL = 'panel',
  ENDPOINT = 'endpoint',
  HOOK = 'hook',
  OPERATION = 'operation',
}

export interface DirectusExtensionProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * The type of Directus extension.
   */
  readonly extensionType: DirectusExtensionType;

  /**
   * The name of the extension (used in the directus:extension config).
   * @default - project name
   */
  readonly extensionName?: string;

  /**
   * Options for the GitHub configuration.
   * Set to false to disable GitHub config entirely.
   * @default - default GitHubConfig with project defaults
   */
  readonly githubConfig?: GitHubConfigOptions | false;
}

/**
 * Whether the extension type is a UI (frontend) extension.
 */
function isUiExtension(type: DirectusExtensionType): boolean {
  return [
    DirectusExtensionType.INTERFACE,
    DirectusExtensionType.DISPLAY,
    DirectusExtensionType.LAYOUT,
    DirectusExtensionType.MODULE,
    DirectusExtensionType.PANEL,
  ].includes(type);
}

/**
 * Returns the target directory where the built extension should be copied.
 */
function extensionTargetDir(type: DirectusExtensionType, name: string): string {
  switch (type) {
    case DirectusExtensionType.ENDPOINT:
      return `endpoints/${name}`;
    case DirectusExtensionType.HOOK:
      return `hooks/${name}`;
    case DirectusExtensionType.OPERATION:
      return `operations/${name}`;
    case DirectusExtensionType.INTERFACE:
      return `interfaces/${name}`;
    case DirectusExtensionType.DISPLAY:
      return `displays/${name}`;
    case DirectusExtensionType.LAYOUT:
      return `layouts/${name}`;
    case DirectusExtensionType.MODULE:
      return `modules/${name}`;
    case DirectusExtensionType.PANEL:
      return `panels/${name}`;
  }
}

export class DirectusExtensionProject extends typescript.TypeScriptProject {

  public readonly githubConfig?: GitHubConfig;
  public readonly extensionType: DirectusExtensionType;
  public readonly extensionName: string;

  constructor(options: DirectusExtensionProjectOptions) {
    const extensionType = options.extensionType;
    const ui = isUiExtension(extensionType);

    super({
      ...options,
      github: false,
      projenrcTs: false,
      projenrcJs: false,
      projenrcJson: false,
      devDeps: [
        '@wbce/projen-directus-extension',
        '@directus/extensions-sdk',
        '@types/node',
        ...(ui ? ['vue'] : []),
        ...(options.devDeps ?? []),
      ],
      tsconfig: {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: javascript.TypeScriptModuleResolution.BUNDLER,
          jsx: javascript.TypeScriptJsxMode.REACT_JSX,
          types: ['node'],
          strict: false,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
        },
        include: ['src', 'src/emails'],
        exclude: ['dist/', 'node_modules'],
      },
    });

    this.extensionType = extensionType;
    this.extensionName = options.extensionName ?? options.name;

    // Add directus:extension field to package.json
    this.package.addField('directus:extension', {
      type: extensionType,
      path: 'dist/index.js',
      source: 'src/index.ts',
      host: '^9.0.0',
    });

    // Build task: build extension, then copy to the appropriate directory
    const targetDir = extensionTargetDir(extensionType, this.extensionName);
    this.compileTask.reset('directus-extension build');
    this.postCompileTask.exec(`mkdir -p ${targetDir}/dist`);
    this.postCompileTask.exec(`cp dist/* ${targetDir}/dist`);
    this.postCompileTask.exec(`cp package.json ${targetDir}`);

    // Sample src/index.ts from template
    new SampleFile(this, 'src/index.ts', {
      contents: readTemplate(extensionType),
    });

    if (options.githubConfig !== false) {
      this.githubConfig = new GitHubConfig(this, options.githubConfig);
    }
  }
}
