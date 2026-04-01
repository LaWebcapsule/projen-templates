import { AddExtensionOptions, DirectusExtensionType, ExtensionFolder } from '@wbce/projen-directus-extension';
import { GitHubConfig, GitHubConfigOptions, Dockerfile } from '@wbce/projen-shared';
import { DockerCompose, javascript, Task, typescript } from 'projen';

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

export class DirectusProject extends javascript.NodeProject {

  public readonly githubConfig?: GitHubConfig;
  public extensions!: ExtensionFolder;
  public extensionFolder!: string;
  public applySchemaTask!: Task;
  public buildExtensionTask!: Task;
  public dockerfile!: Dockerfile;

  constructor(protected options: DirectusProjectOptions) {
    super({
      ...options,
      packageManager: options.packageManager ?? javascript.NodePackageManager.NPM,
      github: false, // We use our own GitHubConfig instead
      devDeps: [
        '@wbce/projen-directus',
        '@wbce/projen-directus-extension',
        ...(options.devDeps ?? []),
      ],
      deps: ['@wbce-d9/directus9@12.0.1'],
    });

    // No tsconfig means no tsc --build in compile
    this.compileTask.reset();

    // Override install task to first link local @wbce/* packages (for dev),
    // then run npm install. In production the links silently fail and npm install resolves from registry.
    const installTask = this.tasks.tryFind('install')!;
    (installTask as any)._locked = false;
    installTask.reset('npm link @wbce/projen-directus @wbce/projen-directus-extension 2>/dev/null || true');
    installTask.exec('npm install');

    this.addExtensionFolder();
    this.addDockerCompose();
    this.addApplySchemaTask();
    this.addFirstRunTask();
    this.addBuildExtensionTask();
    this.addRunTask();
    this.addDockerfile();

    if (options.githubConfig !== false) {
      this.githubConfig = new GitHubConfig(this, options.githubConfig);
    }
  }

  private addExtensionFolder() {
    const folderName = this.options.extensionsFolderName ?? 'plugins';
    this.extensions = new ExtensionFolder(this, folderName);
    this.extensionFolder = folderName;
    this.gitignore.addPatterns('/extensions/');
  }

  public addExtension(name: string, extensionTypes: DirectusExtensionType[], options?: AddExtensionOptions ) {
    return this.extensions.add(name, extensionTypes, options);
  }

  private addFirstRunTask() {
    const task = this.addTask('first-run', {
      description: 'Initialize and start a fresh Directus instance',
    });
    const randomAdmin = Math.floor(Math.random()*100);
    task.exec('docker compose up -d database cache');
    task.spawn(this.applySchemaTask);
    task.exec(`ADMIN_ROLE_ID=$(docker compose exec database psql -U directus -d directus -tAc "SELECT id FROM directus_roles WHERE admin_access = true LIMIT 1") && docker compose run --rm directus npx d9 users create --email admin+${randomAdmin}@example.com --password totototo --role "$ADMIN_ROLE_ID"`);
    task.say(`User admin+${randomAdmin}@example.com has been created with password totototo`);
    task.exec('docker compose up directus');
  }

  private addRunTask() {
    const task = this.addTask('run', {
      description: 'start the Directus instance',
    });
    task.exec('docker compose up directus');
  }

  private addApplySchemaTask() {
    this.applySchemaTask = this.addTask('apply-schema', {
      description: 'Apply SQL snapshot to the local Directus database',
    });
    this.applySchemaTask.exec('npx wbce-directus apply-snapshot --host localhost --user directus --password directus --database directus', {
      condition: 'test -d ./sql',
    });
    this.applySchemaTask.exec('docker compose run --rm directus npx d9 bootstrap', {
      condition: 'test ! -d ./sql',
    });
  }

  private addBuildExtensionTask() {
    this.buildExtensionTask = this.addTask('build-extensions', {
      description: 'Build the directus extensions',
    });
    this.buildExtensionTask.exec(`cd ${this.extensionFolder} && pnpm install`);
    this.buildExtensionTask.exec(`cd ${this.extensionFolder} && pnpm run --recursive build`);
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
            KEY: 'some-random-key',
            SECRET: 'another-random-key',
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

  private addDockerfile() {
    this.dockerfile = new Dockerfile(this)
      .from('node', '22-bookworm-slim')
      .step('update-npm', 'Update npm to fix dependencies')
      .run('npm install -g npm@11.8.0')
      .step('copy-package', 'Copy package.json and package-lock.json first to leverage Docker layer caching')
      .copy('package*.json', '/app/')
      .step('workdir', 'Set working directory')
      .workdir('/app')
      .step('install-deps', 'Install dependencies - without dev dependencies')
      .run('NODE_ENV=production npm install')
      .step('cleanup', 'Cleaning benchmarks folder in tedious module for security')
      .run('rm -rf node_modules/tedious/benchmarks')
      .step('copy-source', 'Copy the rest of the application code')
      .copy('.', '.')
      .step('start', 'Start Directus server')
      .cmdExec(['npx', 'directus', 'start']);
    return this.dockerfile;
  }

}
