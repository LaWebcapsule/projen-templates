import { GitHubConfig, GitHubConfigOptions } from '@wbce/projen-shared';
import { JsonFile, Project, ProjectOptions } from 'projen';
import { ProjenrcTs } from 'projen/lib/typescript/projenrc-ts';


export interface BaseProjectOptions extends ProjectOptions {
  /**
   * Options for the GitHub configuration.
   * Set to false to disable GitHub config entirely.
   * @default - default GitHubConfig with project defaults
   */
  readonly githubConfig?: GitHubConfigOptions | false;

}
//base project
export class BaseProject extends Project {

  public readonly githubConfig?: GitHubConfig;


  constructor(options: BaseProjectOptions) {
    super({
      ...options,
      gitIgnoreOptions: {

      },
    });
    this.tryRemoveFile('.gitignore');

    new ProjenrcTs(this);

    new JsonFile(this, 'package.json', {
      obj: {
        name: options.name,
        devDependencies: {
          '@wbce/projen-blank': '*',
        },
      },
    });

    if (options.githubConfig !== false) {
      this.githubConfig = new GitHubConfig(this, options.githubConfig);
    }

  }


}