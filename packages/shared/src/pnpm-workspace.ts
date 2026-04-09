import { execSync } from 'child_process';
import * as path from 'path';
import { Component, Project, YamlFile, javascript } from 'projen';

/**
 * Auto-generates pnpm-workspace.yaml from subprojects,
 * with optional catalog support.
 */
export class PnpmWorkspace extends Component {
  private readonly catalog: Record<string, string> = {};
  private readonly namedCatalogs: Record<string, Record<string, string>> = {};
  public workspaceYaml: YamlFile;

  constructor(rootProject: Project) {
    super(rootProject);

    this.workspaceYaml = new YamlFile(rootProject, 'pnpm-workspace.yaml', {
      obj: () => {
        const obj: Record<string, unknown> = {
          packages: rootProject.subprojects.map((subproject) =>
            path.relative(rootProject.outdir, subproject.outdir),
          ),
        };

        if (Object.keys(this.catalog).length > 0) {
          obj.catalog = { ...this.catalog };
        }

        if (Object.keys(this.namedCatalogs).length > 0) {
          obj.catalogs = Object.fromEntries(
            Object.entries(this.namedCatalogs).map(([name, deps]) => [name, { ...deps }]),
          );
        }

        return obj;
      },
    });
  }

  preSynthesize(): void {
    for (const sub of this.project.subprojects) {
      if (sub instanceof javascript.NodeProject) {
        // NodePackage.postSynthesize() calls installDependencies() directly,
        // bypassing the task system. Suppress it so the workspace root handles install.
        sub.package.postSynthesize = () => {};
      }
    }
  }

  postSynthesize(): void {
    execSync('pnpm install', { cwd: this.project.outdir, stdio: 'inherit' });
  }

  /**
   * Add a dependency to the default catalog.
   * @param name The package name (e.g. "@wbce-d9/extensions-sdk")
   * @param version The version range (e.g. "^10.0.0")
   */
  public addToCatalog(name: string, version: string): void {
    this.catalog[name] = version;
  }

  /**
   * Add a dependency to a named catalog.
   * @param catalogName The catalog name (e.g. "react17")
   * @param name The package name
   * @param version The version range
   */
  public addToNamedCatalog(catalogName: string, name: string, version: string): void {
    if (!this.namedCatalogs[catalogName]) {
      this.namedCatalogs[catalogName] = {};
    }
    this.namedCatalogs[catalogName][name] = version;
  }
}
