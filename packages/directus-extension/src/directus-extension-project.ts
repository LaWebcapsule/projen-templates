import * as fs from 'fs';
import * as path from 'path';
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
  readonly extensionTypes: DirectusExtensionType[];
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

function includeUiExtension(types: DirectusExtensionType[]) {
  for (const type of types) {
    if (isUiExtension(type)) {
      return true;
    }
  }
  return false;
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

  public readonly extensionTypes: DirectusExtensionType[];
  public readonly extensionName: string;

  constructor(options: DirectusExtensionProjectOptions) {
    const extensionTypes = options.extensionTypes;
    const ui = includeUiExtension(extensionTypes);

    const isEmpty = !options.extensionTypes.length;

    super({
      ...options,
      packageManager: options.packageManager ?? javascript.NodePackageManager.PNPM,
      github: false,
      projenrcTs: false,
      projenrcJs: false,
      projenrcJson: false,
      devDeps: [
        '@wbce/projen-directus-extension',
        '@wbce-d9/extensions-sdk',
        '@wbce-d9/types',
        '@types/node',
        ...(ui ? ['vue'] : []),
        ...(options.devDeps ?? []),
      ],
      sampleCode: isEmpty,
      jest: options.jest ?? !isEmpty,
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
          noImplicitAny: false,
          // Extension plugins are bundled by the Directus SDK (tsc is only used for type-checking),
          // so we suppress emit. Library plugins (no extensionTypes) must emit lib/ with
          // declarations so consumers can resolve their types.
          ...(isEmpty ? {} : { noEmit: true, declaration: false }),
        },
        include: ['src'],
        exclude: ['dist/', 'node_modules'],
      },
    });

    this.extensionTypes = extensionTypes;
    this.extensionName = options.name;

    // Add directus:extension field to package.json
    if (extensionTypes.length > 1) {
      //BUNDLE.
      const bundleConfig: any = {
        host: '^9.27.2',
        type: 'bundle',
        path: {
          app: 'app.js',
          api: 'api.js',
        },
        entries: [] as any[],
      };
      for (const type of options.extensionTypes) {
        bundleConfig.entries.push({
          type,
          name: `${this.extensionName}-${type}`,
          source: `src/${type}/index.ts`,
        });
        // Sample src/index.ts from template
        new SampleFile(this, `src/${type}/index.ts`, {
          contents: readTemplate(type),
        });
      }
      this.package.addField('directus:extension', bundleConfig);


    } else if (extensionTypes.length === 1) {
      const extensionType = extensionTypes[0];
      this.package.addField('directus:extension', {
        type: extensionTypes[0],
        path: 'dist/index.js',
        source: 'src/index.ts',
        host: '^9.0.0',
      });

      // Sample src/index.ts from template
      new SampleFile(this, 'src/index.ts', {
        contents: readTemplate(extensionType),
      });
    }

    if (extensionTypes.length) {

      const extensionSubDir = extensionTypes.length === 1 ? extensionTargetDir(extensionTypes[0], this.extensionName):this.extensionName;
      // Compute relative path from this extension project to the DirectusProject root (grandparent)
      const grandParentOutdir = options.parent?.parent?.outdir ?? '../..';
      const relativeToRoot = path.relative(this.outdir, grandParentOutdir);
      let targetDir = path.join(relativeToRoot, 'extensions', extensionSubDir);
      (this.buildTask as any)._locked = false;
      this.buildTask.reset('npx tsc');
      this.buildTask.exec('directus-extension build');
      this.buildTask.exec(`mkdir -p ${targetDir}`);
      this.buildTask.exec(`cp -r dist/* ${targetDir}`);
      if (extensionTypes.length >1) {
        this.buildTask.exec(`cp package.json ${targetDir}`);
      }
    }

  }
}
