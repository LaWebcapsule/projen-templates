import { PnpmWorkspace } from '@wbce/projen-shared';
import { Project, ProjectOptions } from 'projen';
import { DirectusExtensionProject, DirectusExtensionType } from './directus-extension-project';

/**
 * Options passed to addExtension.
 */
export interface AddExtensionOptions {

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

  workspace: PnpmWorkspace;

  constructor(parentProject: Project, folderName: string, options?: ExtensionFolderOptions) {
    super({
      ...options,
      name: options?.name ?? folderName,
      parent: parentProject,
      outdir: folderName,
    });


    // Create a pnpm workspace from subprojects
    this.workspace = new PnpmWorkspace(this);

    this.compileTask.exec('pnpm run --recursive build');
  }

  /**
   * Add a Directus extension to this folder.
   */
  public add(name: string, extensionTypes: DirectusExtensionType[], options?: AddExtensionOptions): DirectusExtensionProject {
    return new DirectusExtensionProject({
      name,
      extensionTypes,
      parent: this,
      outdir: name,
      devDeps: options?.devDeps,
      deps: options?.deps,
      defaultReleaseBranch: 'main', //not relevant here
    });
  }
}
