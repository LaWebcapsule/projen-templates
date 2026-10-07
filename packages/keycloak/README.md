# @wbce/projen-keycloak

Projen component that adds **Keycloak OpenID Connect SSO + MFA** to a [`@wbce/projen-d9`](../directus) project. It is the generic, schema-as-code version of the SSO + MFA setup for production d9 backends: one `new Keycloak(project, { ... })` wires the OIDC env onto the d9 service, ships a preconfigured Keycloak image (MFA plugins + realm), and installs a two-way user-sync hook.

**Production path.** For a zero-config local demo (HTTP, self-contained Keycloak + Mailpit, one `docker compose up`), use the standalone starter instead: <https://github.com/LaWebcapsule/d9-sso-starter>.

## Usage

`.projenrc.ts`:

```ts
import { D9Project } from '@wbce/projen-d9';
import { Keycloak } from '@wbce/projen-keycloak';

const project = new D9Project({
  name: 'my-d9',
  defaultReleaseBranch: 'main',
});

new Keycloak(project, {
  issuerUrl: 'https://auth.example.com', // your Keycloak base URL
  apiUrl: 'https://api.example.com',     // the d9 API (PUBLIC_URL + OIDC redirect)
  frontUrl: 'https://app.example.com',   // allowed post-login redirect target
  smtp: {                                // optional: real SMTP for invitation / reset emails
    host: 'smtp.example.com',
    from: 'no-reply@example.com',
    user: 'smtp-user',
    password: 'smtp-password',
  },
});

project.synth();
```

Then `npx projen` to regenerate. `issuerUrl` and `apiUrl` are the only required options.

> **The issuer must be HTTPS.** d9's OIDC client (openid-client v6) only accepts an `https://` `issuerUrl` — a plain `http://` issuer is refused at boot (`only requests to HTTPS are allowed`). That's why every example here uses `https://`, and why the [local-demo starter](https://github.com/LaWebcapsule/d9-sso-starter) takes a different, http-patched route instead. In production you terminate TLS in front of Keycloak as usual.

## What gets generated

| Path | What it is |
| --- | --- |
| `docker-compose.yml` (d9 service env) | The `AUTH_KEYCLOAK_*` OIDC variables, `PUBLIC_URL`, and the redirect allow-list are injected onto the existing d9 service. |
| `keycloak/Dockerfile` | A pinned Keycloak image (the version lives in the Dockerfile) that builds the open-source [netzbegruenung MFA plugins](https://github.com/netzbegruenung/keycloak-mfa-plugins) (`enforce-mfa` + `sms-authenticator`) from source and imports the realm on first start (`--import-realm`). |
| `keycloak/realm-export.json` | The realm (`main` by default): the OIDC client, the **browser-sms MFA flow**, `enforce-mfa`, a hardened password-reset flow, and neutral invitation-email texts. SSL required = `external`. |
| `plugins/keycloak-sync/` | The d9 ⇄ Keycloak user-sync hook, built by the existing `build-extensions` task. Skip it with `userSync: false`. |

These files are **regenerated on every `projen` run** from the component's templates: customize them through the options below (or by editing the templates), then re-synth — don't hand-edit the generated output, it gets overwritten.

## How the two-way sync works

The `keycloak-sync` hook keeps d9 and Keycloak in step. Scope is deliberately small — **create ⇄ create + role**, nothing more:

**Direction 1 — d9 → Keycloak.** A user created in the d9 admin UI with **Provider = Keycloak** (the full form, not the quick `+`) is created in Keycloak.
<img width="1907" height="972" alt="Capture d’écran 2026-10-06 à 16 52 22" src="https://github.com/user-attachments/assets/afa70c7c-3ab4-4980-9502-bb3478c00aec" />
Its Keycloak `sub` is stored as the d9 `external_identifier` (the matching key at login). Two filters cover this:
- `users.create` — creates the Keycloak user, then **sends the invitation email** (a set-password link; MFA enrollment happens at first login). The email needs SMTP on the Keycloak side (the `smtp` option) and is **non-blocking** — a send failure is only logged.
- `users.update` — propagates later `email` / `first_name` / `last_name` edits to the same Keycloak user, so the two profiles don't drift.

> These are two complementary filters, not a duplication: the first provisions + invites on creation, the second mirrors profile edits afterwards.

**Direction 2 — Keycloak → d9.** When a user that lives in Keycloak logs in via SSO, d9 auto-creates the account (`AUTH_KEYCLOAK_ALLOW_PUBLIC_REGISTRATION=true`). By default the new user gets **no role** — an admin can assign it from the d9 admin UI (recommended: identity lives in Keycloak, authorization in d9). Set `defaultRole` to grant a baseline role to every SSO user instead. For identity-driven roles (a brokered enterprise IdP's groups, or a Keycloak realm role exposed as a claim), the claims are available on `meta.providerPayload.userInfo` inside the hook.

## MFA

The realm ships the **browser-sms** authentication flow: after the password step, Keycloak enforces a second factor via the `sms-authenticator` plugin, and `enforce-mfa` makes it mandatory. Users can also enroll a TOTP app — [FreeOTP](https://freeotp.github.io/) (open source) or Google Authenticator for example.

## Theming

The login, MFA and account screens are standard Keycloak themes, so they can be fully branded to match your front-ends. Build a custom theme with [Keycloakify](https://keycloakify.dev) — author it in React against your existing design system — add it to the `keycloak/` image, and point the realm at it via its login theme. The SSO screens then share the look and layout of your app instead of the default Keycloak skin.

## Deploying

The component emits **assets you deploy to your own Keycloak** — it does not add a Keycloak (or its database) to the d9 compose stack, on purpose: Keycloak is a separate product with its own lifecycle, which can run on its own instance, not part of the d9 runtime.

1. Build & push the Keycloak image from `keycloak/Dockerfile` and run it with `--import-realm` (first start only).
2. **Client secret — nothing in git.** The d9 service reads `AUTH_KEYCLOAK_CLIENT_SECRET` straight from the environment : the compose file only passes it through (`${AUTH_KEYCLOAK_CLIENT_SECRET}`), and the realm ships a `REGENERATE_IN_KEYCLOAK` placeholder. After importing the realm, **regenerate the client secret in the Keycloak admin console** and provide the value as `AUTH_KEYCLOAK_CLIENT_SECRET` through your secret manager.
3. Configure SMTP (via the `smtp` option, or directly in Keycloak) so invitation / reset emails are delivered.

## Options

See [API.md](./API.md) for the generated `KeycloakOptions` reference.

| Option | Default | Notes |
| --- | --- | --- |
| `issuerUrl` | — (required) | Keycloak base URL; the `.well-known` issuer is derived from it + the realm. |
| `apiUrl` | — (required) | d9 API URL → `PUBLIC_URL` and the OIDC `redirect_uri`. |
| `realm` | `main` | Keycloak realm name. |
| `clientId` | `d9` | OIDC client id (must match the realm's client). |
| `frontUrl` | `apiUrl` | Front-end URL allowed as a post-login redirect. |
| `publicRegistration` | `true` | Auto-create a d9 user on first SSO login (direction 2). |
| `defaultRole` | `""` | Baseline d9 role for SSO users with no mapped role (empty = none). |
| `userSync` | `true` | Install the `keycloak-sync` hook. |
| `smtp` | — | Real SMTP server for Keycloak emails. Omit to configure it in Keycloak later. |

The client secret is intentionally **not** an option — it is supplied at run time via the `AUTH_KEYCLOAK_CLIENT_SECRET` environment variable (secret manager), never written to the repo.

## Testing from cold start

From a fresh clone of this monorepo:

```sh
export JSII_SILENCE_WARNING_UNTESTED_NODE_VERSION=1   # if on an untested Node version

# 1. Bootstrap + build the component and the packages it depends on
pnpm install
pnpm --filter @wbce/projen-shared --filter @wbce/projen-d9-extension \
     --filter @wbce/projen-d9 --filter @wbce/projen-keycloak run build

# 2. Synth tests — validate everything the component generates (realm, env, hook, secret handling)
pnpm --filter @wbce/projen-keycloak run test
```

To validate the **generated assets** end-to-end:

```sh
# 3. From a consumer project that uses the component: regenerate, then build the Keycloak image
#    (proves the Dockerfile + realm import are valid).
npx projen                 # regenerate with your `new Keycloak(...)` block
docker build keycloak/     # builds the pinned Keycloak + MFA plugins + realm import
```

A full **SSO + MFA login** E2E needs a running Keycloak reachable at `issuerUrl`. For a zero-infra local run, the [d9-sso-starter](https://github.com/LaWebcapsule/d9-sso-starter) is the local-demo twin of this component (same realm + hook, HTTP, self-contained) — use it to exercise the full flow, and this component to ship it to production.
