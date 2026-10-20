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

## PhotoFlash sample

The snapshot in `./sql` ships [PhotoFlash](https://docs.cedarpolicy.com/overview/scenario.html), Cedar's reference example, adapted to d9 to show permission editing (Settings → Roles & Permissions) and its Cedar translation in `./permissions`.

| Collection | Fields |
| --- | --- |
| `albums` | `name`, `owner` → user, `parent` → album, `public`, `members` (M2M to users through `albums_members.album_id` / `user_id`) |
| `photos` | `title`, `owner` → user, `album` → album, `private` |

| Role | albums | photos |
| --- | --- | --- |
| Public | read public albums | read non-private photos of public albums |
| User | read public, owned or shared (`members`) albums; create; update/delete owned ones | read owned photos, photos of owned albums, and non-private photos of public or shared albums; create; update/delete owned ones |
| Moderator | read all | read all; update `private` only |

### Writing a forbid as a permit

d9 permissions are permit-only: there is no `forbid` and no `_not`. PhotoFlash hides private photos with

```cedar
forbid (principal, action == Action::"viewPhoto", resource)
when { resource.private }
unless { resource.owner == principal };
```

so the condition is negated (De Morgan: `!(a && !b)` is `!a || b`) and folded into the permit itself — see `permissions/User/authorize.cedar`:

```cedar
when {
     resource.owner == principal
  || resource.album.owner == principal
  || (resource.private == false && (resource.album.public == true || resource.album.members.user_id == principal))
};
```

Keep filters to the operators the Cedar translation supports (`_and`, `_or`, `_eq`, `_neq`, `_gt(e)`, `_lt(e)`, `_null`, `_nnull`, `_contains`, `_starts_with`, `_ends_with`, `$CURRENT_USER`).

### Regenerating the sample

`scripts/seed-photoflash.mjs` builds the collections, roles, permissions and data through the REST API on a fresh instance. Then save it with `npx projen d9-plumbing save --host localhost --user d9 --password d9 --database d9`. Users are not part of the snapshot: `owner` columns point to the CI user.
