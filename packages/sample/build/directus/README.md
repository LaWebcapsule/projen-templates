# my-test-project

A [d9](https://github.com/LaWebcapsule/d9) (Directus 9 fork) project scaffolded with [`@wbce/projen-d9`](https://www.npmjs.com/package/@wbce/projen-d9). Develop locally against Docker Compose, then build a Docker image to deploy anywhere.

## Local development

```sh
npx projen install      # install dependencies
npx projen first-run    # boot stack, create admin, start d9
```

Open http://localhost:8055 and sign in as `admin@example.com` / `totototo`. Extensions auto-reload (`EXTENSIONS_AUTO_RELOAD=true`).

## Deploy

A `Dockerfile` is included. Build and push the image for your target environment:

```sh
docker build -t <registry>/<image>:<tag> .
docker push <registry>/<image>:<tag>
```

Configure the deployed instance with environment variables (database, cache, secrets) — see the d9 docs.

## Common tasks

| Task | Description |
| --- | --- |
| `npx projen run` | Start d9 (`docker compose up directus`) |
| `npx projen build-extensions` | Install and build all extensions |
| `npx projen create-an-admin` | Create the default admin user |

See `.projen/tasks.json` for the full list.

## Configuration

Edit `.projenrc.js` and run `npx projen` to regenerate project files. Local environment overrides go in `.env.local`.

## Extensions

Extensions live under `./plugins/`. Add new ones in `.projenrc.js`:

```js
import { D9ExtensionType } from '@wbce/projen-d9-extension';

project.addExtension('my-hook', [D9ExtensionType.HOOK]);
```

Then `npx projen && npx projen build-extensions`.