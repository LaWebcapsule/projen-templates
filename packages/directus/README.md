# @wbce/projen-directus

Projen template for [d9](https://github.com/LaWebcapsule/d9) projects (fork of Directus v9). Scaffolds a local development setup with Docker Compose (Postgres + Redis), extension management, and GitHub workflows — then produces a Docker image you can deploy to any environment.

Companion package: [`@wbce/projen-directus-extension`](../directus-extension) for authoring extensions.

## Bootstrap a new project

```sh
npx projen new --from @wbce/projen-directus
```

This creates a `.projenrc.js` and synthesizes the project.

## Usage

`.projenrc.js`:

```js
import { DirectusProject } from '@wbce/projen-directus';
import { DirectusExtensionType } from '@wbce/projen-directus-extension';

const project = new DirectusProject({
  name: 'my-d9',
  defaultReleaseBranch: 'main',
  eslintOptions: {
    dirs: ['src', 'test'],
    prettier: true,
  },
});

// A shared package other extensions can depend on
project.addExtension('shared', []);

// A hook extension that depends on the shared package
const myHook = project.addExtension('my-hook', [DirectusExtensionType.HOOK]);
myHook.addDeps('shared@workspace:');

project.synth();
```

Then synth and start it:

```sh
npx projen
npx projen first-run   # boot stack + create admin user
npx projen run         # start d9 (port 8055)
```

The default admin user is `admin@example.com` / `totototo`.

### Extension types

`DirectusExtensionType` values: `INTERFACE`, `DISPLAY`, `LAYOUT`, `MODULE`, `PANEL`, `ENDPOINT`, `HOOK`, `OPERATION`. Pass an empty array for a shared (non-extension) package.

Extensions live under `./plugins/` (configurable via `extensionsFolderName`) and are built by the `build-extensions` task.

## Generated tasks

| Task | Description |
| --- | --- |
| `first-run` | Boot the stack, create admin, start d9 |
| `run` | Start d9 (`docker compose up directus`) |
| `build-extensions` | Install and build all extensions |
| `create-an-admin` | Create the default admin user |

## What gets generated

- `docker-compose.yml` — d9, Postgres (PostGIS), Redis with healthchecks
- `Dockerfile` — Node 22 + pnpm, builds extensions
- `.env.local` — sample for local environment overrides
- GitHub workflows via [`@wbce/projen-shared`](../shared) (set `githubConfig: false` to disable)
- A `*-save` branch workflow that auto-opens a PR back to the base branch

## Options

See [API.md](./API.md) for the full `DirectusProjectOptions` reference. Highlights:

- `extensionsFolderName` — folder for extension packages (default: `plugins`)
- `packageVersions.d9` — version of `@wbce-d9/directus9` (default: `12.0.1`)
- `packageVersions.atlas` — version of `@ariga/atlas` (default: `0.32.0`)
- `githubConfig` — `GitHubConfigOptions` or `false` to disable