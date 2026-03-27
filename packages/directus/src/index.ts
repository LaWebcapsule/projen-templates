import { AddExtensionOptions, DirectusExtensionType, ExtensionFolder } from '@wbce/projen-directus-extension';
import { GitHubConfig, GitHubConfigOptions } from '@wbce/projen-shared';
import { DockerCompose, typescript } from 'projen';

export interface DirectusProjectOptions extends typescript.TypeScriptProjectOptions {
  /**
   * Options for the GitHub configuration.
   * Set to false to disable GitHub config entirely.
   * @default - default GitHubConfig with project defaults
   */
  readonly githubConfig?: GitHubConfigOptions | false;

  /**
   * The name of the extensions folder.
   * @default "extension-packages"
   */
  readonly extensionsFolderName?: string;
}

export class DirectusProject extends typescript.TypeScriptProject {

  public readonly githubConfig?: GitHubConfig;
  public extensions!: ExtensionFolder;

  constructor(protected options: DirectusProjectOptions) {
    super({
      ...options,
      github: false, // We use our own GitHubConfig instead
      sampleCode: false,
      devDeps: [
        '@wbce/projen-directus',
        '@wbce/projen-directus-extension',
        ...(options.devDeps ?? []),
      ],
    });

    this.addExtensionFolder();
    this.addDockerCompose();

    if (options.githubConfig !== false) {
      this.githubConfig = new GitHubConfig(this, options.githubConfig);
    }
  }

  private addExtensionFolder(){
    const folderName = this.options.extensionsFolderName ?? 'extension-packages';
    this.extensions = new ExtensionFolder(this, folderName);
    this.gitignore.addPatterns(`/extensions/`);
  }

  public addExtension(name: string, extensionType: DirectusExtensionType, options: AddExtensionOptions ){
    return this.extensions.addExtension(name, extensionType, options)
  }

  private addDockerCompose() {
    const dc = new DockerCompose(this, {
      services: {
        database: {
          image: 'postgis/postgis:13-master',
          volumes: [
            DockerCompose.namedVolume('pgdata', '/var/lib/postgresql/data'),
          ],
          ports: [
            DockerCompose.portMapping(5432, 5432),
          ],
          environment: {
            POSTGRES_USER: 'directus',
            POSTGRES_PASSWORD: 'directus',
            POSTGRES_DB: 'directus',
          },
        },
        cache: {
          image: 'redis:6',
          volumes: [
            DockerCompose.namedVolume('redis_storage', '/data'),
          ],
          ports: [
            DockerCompose.portMapping(6379, 6379),
          ],
        },
        directus: {
          imageBuild: { context: '.' },
          ports: [
            DockerCompose.portMapping(8055, 8055),
          ],
          volumes: [
            DockerCompose.bindVolume('./uploads', '/app/uploads'),
            DockerCompose.bindVolume('./extensions', '/app/extensions'),
          ],
          dependsOn: [
            DockerCompose.serviceName('cache'),
            DockerCompose.serviceName('database'),
          ],
          environment: {
            KEY: 'toto',
            SECRET: '1234',
            DB_CLIENT: 'pg',
            DB_HOST: 'database',
            DB_PORT: '5432',
            DB_DATABASE: 'directus',
            DB_USER: 'directus',
            DB_PASSWORD: 'directus',
            CACHE_ENABLED: 'false',
            CACHE_REDIS_HOST: 'cache',
            CACHE_STATUS_HEADER: 'cache-hit',
            CORS_ENABLED: 'true',
            CORS_ORIGIN: 'true',
            LOG_LEVEL: 'info',
            ADMIN_EMAIL: 'admin@example.com',
            ADMIN_PASSWORD: 'totototo',
            EXTENSIONS_AUTO_RELOAD: 'true',
            VALIDATE_ENTITIES_TOKENS_API_KEY: 'toto',
            AWS_KMS_KEY_ID: 'tutu',
          },
          command: ['sh', '-c', 'npx directus bootstrap && npx directus start'],
        },
      },
    });

    // Add healthcheck for database (not natively supported by projen DockerCompose)
    dc.file.addOverride('services.database.healthcheck', {
      test: ['CMD', 'pg_isready', '--host=localhost', '--username=directus'],
      interval: '10s',
      timeout: '5s',
      retries: 5,
      start_interval: '5s',
      start_period: '30s',
    });

    // Add healthcheck for cache
    dc.file.addOverride('services.cache.healthcheck', {
      test: ['CMD-SHELL', '[ $(redis-cli ping) = \'PONG\' ]'],
      interval: '10s',
      timeout: '5s',
      retries: 5,
      start_interval: '5s',
      start_period: '30s',
    });

    // Override depends_on to use condition syntax
    dc.file.addOverride('services.directus.depends_on', {
      cache: { condition: 'service_healthy' },
      database: { condition: 'service_healthy' },
    });
    
    return dc;
  }

}
