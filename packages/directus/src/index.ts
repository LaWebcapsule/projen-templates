import { AddExtensionOptions, D9ExtensionType, ExtensionFolder } from '@wbce/projen-d9-extension';
import { GitHubConfig, GitHubConfigOptions, Dockerfile } from '@wbce/projen-shared';
import { AiAgent, AiInstructions, DockerCompose, DockerComposeService, javascript, SampleFile, Task, typescript } from 'projen';
import { JobPermission } from 'projen/lib/github/workflows-model';
import { UpgradeDependenciesSchedule } from 'projen/lib/javascript';

export interface PackageVersions {
  readonly d9?: string;
  /**
   * The version of @ariga/atlas to use.
   * @default "0.32.0"
   */
  readonly atlas?: string;
}


export interface D9ProjectOptions extends typescript.TypeScriptProjectOptions {
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
  readonly packageVersions?: PackageVersions;
}

export class D9Project extends javascript.NodeProject {

  public readonly githubConfig?: GitHubConfig;
  public extensions!: ExtensionFolder;
  public extensionFolder!: string;
  public applySchemaTask!: Task;
  public buildExtensionTask!: Task;
  public dockerfile!: Dockerfile;
  public dockerComposeFile!: DockerCompose;
  public directusService!: DockerComposeService;
  public databaseService!: DockerComposeService;
  public cacheService!: DockerComposeService;

  constructor(protected options: D9ProjectOptions) {
    const d9Version = options.packageVersions?.d9 || '12.0.1';
    const atlasVersion = options.packageVersions?.atlas || '0.32.0';
    super({
      ...options,
      packageManager: options.packageManager ?? javascript.NodePackageManager.NPM,
      github: false, // We use our own GitHubConfig instead
      depsUpgrade: true,
      depsUpgradeOptions: {
        workflowOptions: {
          schedule: UpgradeDependenciesSchedule.DAILY,
        },
      },
      licensed: false,
      readme: options.readme ?? {
        contents: [
          `# ${options.name}`,
          '',
          'A [d9](https://github.com/LaWebcapsule/d9) (Directus 9 fork) project scaffolded with [`@wbce/projen-d9`](https://www.npmjs.com/package/@wbce/projen-d9). Develop locally against Docker Compose, then build a Docker image to deploy anywhere.',
          '',
          '## Local development',
          '',
          '```sh',
          'npx projen install      # install dependencies',
          'npx projen first-run    # boot stack, create admin, start d9',
          '```',
          '',
          'Open http://localhost:8055 and sign in as `admin@example.com` / `totototo`. Extensions auto-reload (`EXTENSIONS_AUTO_RELOAD=true`).',
          '',
          '## Deploy',
          '',
          'A `Dockerfile` is included. Build and push the image for your target environment:',
          '',
          '```sh',
          'docker build -t <registry>/<image>:<tag> .',
          'docker push <registry>/<image>:<tag>',
          '```',
          '',
          'Configure the deployed instance with environment variables (database, cache, secrets) — see the d9 docs.',
          '',
          '## Common tasks',
          '',
          '| Task | Description |',
          '| --- | --- |',
          '| `npx projen run` | Start d9 (`docker compose up directus`) |',
          '| `npx projen build-extensions` | Install and build all extensions |',
          '| `npx projen create-an-admin` | Create the default admin user |',
          '',
          'See `.projen/tasks.json` for the full list.',
          '',
          '## Configuration',
          '',
          'Edit `.projenrc.js` and run `npx projen` to regenerate project files. Local environment overrides go in `.env.local`.',
          '',
          '## Extensions',
          '',
          'Extensions live under `./plugins/`. Add new ones in `.projenrc.js`:',
          '',
          '```js',
          "import { D9ExtensionType } from '@wbce/projen-d9-extension';",
          '',
          "project.addExtension('my-hook', [D9ExtensionType.HOOK]);",
          '```',
          '',
          'Then `npx projen && npx projen build-extensions`.',
        ].join('\n'),
      },
      devDeps: [
        '@wbce/projen-d9',
        '@wbce/projen-d9-extension',
        `@ariga/atlas@${atlasVersion}`,
        ...(options.devDeps ?? []),
      ],
      deps: [`@wbce-d9/directus9@${d9Version}`],
    });

    // No tsconfig means no tsc --build in compile
    this.compileTask.reset();

    this.addExtensionFolder();
    this.addDockerCompose();
    this.addApplySchemaTask();
    this.addFirstRunTask();
    this.addBuildExtensionTask();
    this.addRunTask();
    this.addDockerfile();
    this.addCreateAdminUserTask();

    new AiInstructions(this, {
      agents: [AiAgent.CLAUDE],
    });

    if (options.githubConfig !== false) {
      this.githubConfig = new GitHubConfig(this, options.githubConfig);
      this.addSaveBranchWorkflow();
    }
    this.gitignore.addPatterns('uploads');
    this.gitignore.addPatterns('**/.DS_Store');
    this.gitignore.addPatterns('.env.local');

    // Create an empty .env.local if it doesn't exist, so Docker doesn't mount a directory
    new SampleFile(this, '.env.local', { contents: '# Local environment overrides for Directus' });
  }

  private addExtensionFolder() {
    const folderName = this.options.extensionsFolderName ?? 'plugins';
    this.extensions = new ExtensionFolder({ parent: this, name: folderName });
    this.extensionFolder = folderName;
    this.gitignore.exclude('extensions/*');
    this.gitignore.include('extensions/templates/');
  }

  public addExtension(name: string, extensionTypes: D9ExtensionType[], options?: AddExtensionOptions ) {
    return this.extensions.add(name, extensionTypes, options);
  }

  private addFirstRunTask() {
    const task = this.addTask('first-run', {
      description: 'Initialize and start a fresh Directus instance',
    });
    const adminEmail = 'admin@example.com';
    const userNotExistsCondition = `docker compose exec database psql -U directus -d directus -tAc "SELECT count(*) FROM directus_users WHERE email = '${adminEmail}'" | grep -q '^0$'`;
    task.exec('docker compose up -d --wait database cache');
    task.spawn(this.applySchemaTask);
    task.exec(`ADMIN_ROLE_ID=$(docker compose exec database psql -U directus -d directus -tAc "SELECT id FROM directus_roles WHERE admin_access = true LIMIT 1") && docker compose run --rm directus npx directus users create --email ${adminEmail} --password totototo --role "$ADMIN_ROLE_ID"`, {
      condition: userNotExistsCondition,
    });
    task.say(`User ${adminEmail} has been created with password totototo`, {
      condition: userNotExistsCondition,
    });
    task.say(`User ${adminEmail} already exists, skipping creation`, {
      condition: `! ${userNotExistsCondition}`,
    });
    task.exec('docker compose up directus');
  }

  private addCreateAdminUserTask() {
    const task = this.addTask('create-an-admin', {
      description: 'Create an admin user',
    });
    const adminEmail = 'admin@example.com';
    const userNotExistsCondition = `docker compose exec database psql -U directus -d directus -tAc "SELECT count(*) FROM directus_users WHERE email = '${adminEmail}'" | grep -q '^0$'`;
    task.exec('docker compose up -d --wait database cache');
    task.exec(`ADMIN_ROLE_ID=$(docker compose exec database psql -U directus -d directus -tAc "SELECT id FROM directus_roles WHERE admin_access = true LIMIT 1") && docker compose run --rm directus npx directus users create --email ${adminEmail} --password totototo --role "$ADMIN_ROLE_ID"`, {
      condition: userNotExistsCondition,
    });
    task.say(`User ${adminEmail} has been created with password totototo`, {
      condition: userNotExistsCondition,
    });
    task.say(`User ${adminEmail} already exists, skipping creation`, {
      condition: `! ${userNotExistsCondition}`,
    });
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
    // Merge Cedar policies back into directus_permissions.csv BEFORE the
    // snapshot is loaded, so the COPY in apply-snapshot ingests the rewritten
    // CSV. Runs only when a ./permissions folder is present.
    this.applySchemaTask.exec('npx wbce-d9 cedar-to-d9 --permissions ./permissions --sql ./sql/data --overwrite', {
      condition: 'test -d ./permissions && test -f ./sql/data/directus_permissions.csv',
    });
    this.applySchemaTask.exec('npx wbce-directus apply-snapshot --host localhost --user directus --password directus --database directus', {
      condition: 'test -d ./sql',
    });
    this.applySchemaTask.exec('docker compose run --rm directus npx directus bootstrap', {
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
    const dc = new DockerCompose(this);

    this.databaseService = dc.addService('database', {
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
    });

    this.cacheService = dc.addService('cache', {
      image: 'redis:6',
      volumes: [
        DockerCompose.namedVolume('redis_storage', '/data'),
      ],
      ports: [
        DockerCompose.portMapping(6379, 6379),
      ],
    });

    this.directusService = dc.addService('directus', {
      imageBuild: { context: '.' },
      ports: [
        DockerCompose.portMapping(8055, 8055),
      ],
      volumes: [
        DockerCompose.bindVolume('./uploads', '/app/uploads'),
        DockerCompose.bindVolume('./extensions', '/app/extensions'),
      ],
      // dependsOn is set via addOverride below with condition: service_healthy
      environment: {
        KEY: 'some-random-key',
        SECRET: 'another-random-key',
        CONFIG_PATH: '.env.local',
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
      command: ['sh', '-c', 'npx directus start'],
    });

    this.directusService.addVolume(DockerCompose.bindVolume('./.env.local', '/app/.env.local'));

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

    this.dockerComposeFile = dc;

    return dc;
  }

  private addSaveBranchWorkflow() {
    const workflow = this.githubConfig!.addWorkflow('save-branch');
    workflow.on({ push: { branches: ['*-save'] } });
    workflow.addJob('create-pr', {
      name: 'Create Pull Request',
      runsOn: ['ubuntu-latest'],
      permissions: {
        contents: JobPermission.READ,
        pullRequests: JobPermission.WRITE,
      },
      steps: [
        { name: 'Checkout', uses: 'actions/checkout@v4' },
        {
          name: 'Create Pull Request',
          run: 'gh pr create --title "Save: ${GITHUB_REF_NAME%-save}" --body "Auto-generated PR from branch \\`${GITHUB_REF_NAME%-save}\\`" --base "${GITHUB_REF_NAME%-save}" || echo "PR already exists"',
          env: { GH_TOKEN: '${{ secrets.GITHUB_TOKEN }}' },
        },
      ],
    });
  }

  private addDockerfile() {
    this.dockerfile = new Dockerfile(this)
      .from('node', '22-bookworm-slim')
      .step('update-npm', 'Update npm to fix dependencies')
      .run('npm install -g npm@11.8.0')
      .step('install-pnpm', 'install pnpm')
      .run('npm install -g pnpm@10.33.0')
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
      .step('build-extension', 'build extensions')
      .run('npx projen build-extensions')
      .step('start', 'Start Directus server')
      .cmdExec(['npx', 'directus', 'start']);
    return this.dockerfile;
  }

}

/**
 * @deprecated Use {@link D9ProjectOptions} instead. The package was renamed to `@wbce/projen-d9` to reflect that it targets the d9 fork, not upstream Directus.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DirectusProjectOptions extends D9ProjectOptions {}

/**
 * @deprecated Use {@link D9Project} instead. The package was renamed to `@wbce/projen-d9` to reflect that it targets the d9 fork, not upstream Directus.
 */
export class DirectusProject extends D9Project {}
