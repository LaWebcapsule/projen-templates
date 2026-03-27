import * as fs from 'fs';
import * as path from 'path';
import { PnpmWorkspace } from '@wbce/projen-shared';
import { Project, ProjectOptions } from 'projen';
import { DirectusExtensionProject, DirectusExtensionType } from './directus-extension-project';

// templates/ is at the package root, resolve from __dirname (src/ or lib/)
const TEMPLATES_DIR = fs.existsSync(path.join(__dirname, 'templates'))
  ? path.join(__dirname, 'templates')
  : path.join(__dirname, '..', 'templates');

/**
 * Options passed to addExtension.
 */
export interface AddExtensionOptions {
  /**
   * The name of the extension (used in the directus:extension config).
   * @default - the extension project name
   */
  readonly extensionName?: string;

  /**
   * The default release branch.
   * @default "main"
   */
  readonly defaultReleaseBranch?: string;

  /**
   * Additional dev dependencies.
   */
  readonly devDeps?: string[];

  /**
   * Additional dependencies.
   */
  readonly deps?: string[];
}

/**
 * Options for the ExtensionFolder.
 */
export interface ExtensionFolderOptions extends ProjectOptions {
  /**
   * Path to the extensions config file (JSON).
   * @default "extensions.json"
   */
  readonly configFile?: string;
}

/**
 * A folder that acts as a pnpm workspace containing Directus extensions.
 * Extensions can be added programmatically via addExtension() or
 * declared in extensions.json and loaded automatically.
 *
 * @example
 * const project = new DirectusProject({ name: 'my-app', defaultReleaseBranch: 'main' });
 * project.extensions.addExtension('my-hook', DirectusExtensionType.HOOK);
 */
export class ExtensionFolder extends Project {
  private readonly configFilePath: string;

  constructor(parentProject: Project, folderName: string, options?: ExtensionFolderOptions) {
    super({
      ...options,
      name: options?.name ?? folderName,
      parent: parentProject,
      outdir: folderName,
    });

    this.configFilePath = options?.configFile ?? 'extensions.json';

    // Create a pnpm workspace from subprojects
    new PnpmWorkspace(this);

    // Load extensions from config file
    this.loadExtensionsFromConfig();

    // Register the create-extension task on the root project
    this.addCreateExtensionTask(parentProject);
  }

  /**
   * Add a Directus extension to this folder.
   */
  public addExtension(name: string, extensionType: DirectusExtensionType, options?: AddExtensionOptions): DirectusExtensionProject {
    return new DirectusExtensionProject({
      name,
      extensionType,
      extensionName: options?.extensionName,
      parent: this,
      outdir: name,
      defaultReleaseBranch: options?.defaultReleaseBranch ?? 'main',
      devDeps: options?.devDeps,
      deps: options?.deps,
      githubConfig: false,
    });
  }

  private loadExtensionsFromConfig() {
    const configPath = path.join(this.outdir, this.configFilePath);
    if (!fs.existsSync(configPath)) {
      return;
    }

    const entries: Array<{ name: string; type: string }> = JSON.parse(
      fs.readFileSync(configPath, 'utf-8'),
    );

    for (const entry of entries) {
      const extensionType = entry.type as DirectusExtensionType;
      this.addExtension(entry.name, extensionType);
    }
  }

  private addCreateExtensionTask(parentProject: Project) {
    const scriptPath = path.join(TEMPLATES_DIR, 'create-extension.ts');
    const configPath = path.join(this.outdir, this.configFilePath);

    const task = parentProject.addTask('create-extension', {
      description: 'Create a new Directus extension. Usage: NAME=my-ext TYPE=hook npx projen create-extension',
    });
    task.exec(`npx tsx ${scriptPath} ${configPath}`);
    task.exec('npx projen');
  }
}
