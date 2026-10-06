import * as fs from 'fs';
import * as path from 'path';
import { D9Project } from '@wbce/projen-d9';
import { Component, TextFile } from 'projen';

// Templates live in <package>/templates. In dev __dirname is src/ (→ ../templates); after build they're
// copied into lib/templates by the postCompile task (→ ./templates). Mirrors @wbce/projen-d9-extension.
const TEMPLATES_DIR = fs.existsSync(path.join(__dirname, 'templates'))
  ? path.join(__dirname, 'templates')
  : path.join(__dirname, '..', 'templates');

function template(file: string, vars: { [key: string]: string } = {}): string[] {
  let content = fs.readFileSync(path.join(TEMPLATES_DIR, file), 'utf-8');
  for (const key of Object.keys(vars)) {
    content = content.split(`{{${key}}}`).join(vars[key]);
  }
  return content.replace(/\n$/, '').split('\n');
}

/** Real SMTP server for Keycloak emails (invitations, password reset). No local Mailpit in production. */
export interface KeycloakSmtp {
  /** SMTP host, e.g. `email-smtp.eu-west-3.amazonaws.com` (AWS SES). */
  readonly host: string;
  /** Sender address (must be verified with your provider). */
  readonly from: string;
  /** @default "587" */
  readonly port?: string;
  /** Display name for the sender. @default "" */
  readonly fromDisplayName?: string;
  /** SMTP username. Enables auth when set. Inject via a secret manager — don't commit it. */
  readonly user?: string;
  /** SMTP password. Inject via a secret manager — don't commit it. */
  readonly password?: string;
  /** @default true */
  readonly starttls?: boolean;
  /** @default false */
  readonly ssl?: boolean;
}

export interface KeycloakOptions {
  /** Public base URL of your Keycloak, e.g. `https://auth.example.com`. */
  readonly issuerUrl: string;
  /** Public URL of the d9 API (sets PUBLIC_URL, determines the OIDC redirect_uri), e.g. `https://api.example.com`. */
  readonly apiUrl: string;
  /** Keycloak realm name. @default "main" */
  readonly realm?: string;
  /** OIDC client id (must match the Keycloak client). @default "d9" */
  readonly clientId?: string;
  /** OIDC client secret. Inject a real, regenerated secret via your secret manager — don't ship it in git. @default "d9-local-dev-secret" */
  readonly clientSecret?: string;
  /** Front-end URL allowed as a post-login redirect (AUTH_KEYCLOAK_REDIRECT_ALLOW_LIST). @default the apiUrl */
  readonly frontUrl?: string;
  /** Auto-create a d9 user on first SSO login (Keycloak → d9 direction). @default true */
  readonly publicRegistration?: boolean;
  /** Baseline d9 role granted to SSO users with no mapped role (KEYCLOAK_SYNC_DEFAULT_ROLE). @default "" */
  readonly defaultRole?: string;
  /** Install the keycloak-sync hook (two-way user sync d9 ⇄ Keycloak). @default true */
  readonly userSync?: boolean;
  /** Real SMTP server for Keycloak emails (invitations/reset). If omitted, no SMTP is set — configure it in Keycloak later. */
  readonly smtp?: KeycloakSmtp;
}

/**
 * Adds Keycloak OpenID Connect SSO + MFA to a {@link D9Project}: the OIDC env on the d9 service, the
 * `keycloak-sync` user-provisioning hook, and a preconfigured realm (browser-sms MFA flow) + a Keycloak
 * image with the MFA plugins — assets you deploy to your own Keycloak.
 *
 * Production path. For a zero-config local demo, use the standalone starter instead:
 * https://github.com/LaWebcapsule/d9-sso-starter
 *
 * @example
 * const project = new D9Project({ name: 'my-d9', defaultReleaseBranch: 'main' });
 * new Keycloak(project, {
 *   issuerUrl: 'https://auth.example.com',
 *   apiUrl: 'https://api.example.com',
 *   frontUrl: 'https://app.example.com',
 * });
 * project.synth();
 */
export class Keycloak extends Component {
  constructor(project: D9Project, options: KeycloakOptions) {
    super(project);

    const realm = options.realm ?? 'main';
    const clientId = options.clientId ?? 'd9';
    const clientSecret = options.clientSecret ?? 'd9-local-dev-secret';
    const frontUrl = options.frontUrl ?? options.apiUrl;
    const issuerBase = options.issuerUrl.replace(/\/+$/, '');
    const issuerUrl = `${issuerBase}/realms/${realm}/.well-known/openid-configuration`;

    // 1) OIDC env on the d9 (directus) service — proven addOverride pattern (see @wbce/projen-d9).
    const dc = project.dockerComposeFile;
    const env = (key: string, value: string) =>
      dc.file.addOverride(`services.directus.environment.${key}`, value);
    env('PUBLIC_URL', options.apiUrl);
    env('AUTH_PROVIDERS', 'keycloak');
    env('AUTH_KEYCLOAK_DRIVER', 'openid');
    env('AUTH_KEYCLOAK_CLIENT_ID', clientId);
    env('AUTH_KEYCLOAK_CLIENT_SECRET', clientSecret);
    env('AUTH_KEYCLOAK_ISSUER_URL', issuerUrl);
    env('AUTH_KEYCLOAK_IDENTIFIER_KEY', 'sub');
    env('AUTH_KEYCLOAK_ALLOW_PUBLIC_REGISTRATION', String(options.publicRegistration ?? true));
    env('AUTH_KEYCLOAK_REDIRECT_ALLOW_LIST', frontUrl);
    env('KEYCLOAK_SYNC_DEFAULT_ROLE', options.defaultRole ?? '');

    // 2) Keycloak image assets (MFA plugins + realm import). Emitted as regenerated TextFiles (versioned):
    //    re-run projen to pick up component updates — they are not meant to be hand-edited.
    new TextFile(project, 'keycloak/Dockerfile', { lines: template('keycloak.Dockerfile') });

    // Realm: parse the template JSON and set the parameterized fields (cleaner than string placeholders
    // in an 80 KB file). Keeps the whole realm opaque otherwise — only the project-specific bits change.
    const realmJson: any = JSON.parse(fs.readFileSync(path.join(TEMPLATES_DIR, 'realm-export.json'), 'utf-8'));
    realmJson.realm = realm;
    realmJson.sslRequired = 'external';
    for (const client of realmJson.clients ?? []) {
      if (client.clientId === 'd9') {
        client.clientId = clientId;
        client.secret = clientSecret;
      }
    }
    for (const user of realmJson.users ?? []) {
      if (user.serviceAccountClientId === 'd9') {
        user.serviceAccountClientId = clientId;
        user.username = `service-account-${clientId}`;
      }
    }
    if (options.smtp) {
      const s = options.smtp;
      realmJson.smtpServer = {
        host: s.host,
        port: s.port ?? '587',
        from: s.from,
        fromDisplayName: s.fromDisplayName ?? '',
        ssl: String(s.ssl ?? false),
        starttls: String(s.starttls ?? true),
        auth: String(Boolean(s.user)),
        ...(s.user ? { user: s.user } : {}),
        ...(s.password ? { password: s.password } : {}),
      };
    }
    new TextFile(project, 'keycloak/realm-export.json', {
      lines: JSON.stringify(realmJson, null, 2).split('\n'),
    });

    // 3) keycloak-sync hook (two-way d9 ⇄ Keycloak), built by the existing `build-extensions` task.
    if (options.userSync ?? true) {
      const hook = `${project.extensionFolder}/keycloak-sync`;
      new TextFile(project, `${hook}/package.json`, { lines: template('keycloak-sync/package.json') });
      new TextFile(project, `${hook}/tsconfig.json`, { lines: template('keycloak-sync/tsconfig.json') });
      new TextFile(project, `${hook}/src/index.ts`, { lines: template('keycloak-sync/src/index.ts') });
      new TextFile(project, `${hook}/src/kc-manager.ts`, { lines: template('keycloak-sync/src/kc-manager.ts') });
    }
  }
}
