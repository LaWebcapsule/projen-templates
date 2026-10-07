import * as fs from 'fs';
import * as path from 'path';
import { D9Project } from '@wbce/projen-d9';
import { Component, TextFile } from 'projen';

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

export interface KeycloakSmtp {
  readonly host: string;
  readonly from: string;
  readonly port?: string;
  readonly fromDisplayName?: string;
  readonly user?: string;
  readonly password?: string;
  readonly starttls?: boolean;
  readonly ssl?: boolean;
}

export interface KeycloakOptions {
  readonly issuerUrl: string;
  readonly apiUrl: string;
  readonly realm?: string;
  readonly clientId?: string;
  readonly frontUrl?: string;
  readonly publicRegistration?: boolean;
  readonly defaultRole?: string;
  readonly userSync?: boolean;
  readonly smtp?: KeycloakSmtp;
}

/**
 * Adds Keycloak OpenID Connect SSO + MFA to a {@link D9Project}: the OIDC env on the d9 service, the
 * `keycloak-sync` user-provisioning hook, and a preconfigured realm (browser-sms MFA flow) + a Keycloak
 * image with the MFA plugins — assets you deploy to your own Keycloak.
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
    env('AUTH_KEYCLOAK_CLIENT_SECRET', '${AUTH_KEYCLOAK_CLIENT_SECRET}');
    env('AUTH_KEYCLOAK_ISSUER_URL', issuerUrl);
    env('AUTH_KEYCLOAK_IDENTIFIER_KEY', 'sub');
    env('AUTH_KEYCLOAK_ALLOW_PUBLIC_REGISTRATION', String(options.publicRegistration ?? true));
    env('AUTH_KEYCLOAK_REDIRECT_ALLOW_LIST', frontUrl);
    env('KEYCLOAK_SYNC_DEFAULT_ROLE', options.defaultRole ?? '');

    // 2) Keycloak image assets (MFA plugins + realm import). Emitted as regenerated TextFiles (versioned):
    //    re-run projen to pick up component updates
    new TextFile(project, 'keycloak/Dockerfile', { lines: template('keycloak.Dockerfile') });

    // Realm: parse the template JSON and set the parameterized fields (cleaner than string placeholders
    // in an 80 KB file). Everything can be customed by hand
    const realmJson: any = JSON.parse(fs.readFileSync(path.join(TEMPLATES_DIR, 'realm-export.json'), 'utf-8'));
    realmJson.realm = realm;
    realmJson.sslRequired = 'external';
    for (const client of realmJson.clients ?? []) {
      if (client.clientId === 'd9') {
        client.clientId = clientId;
        client.secret = 'REGENERATE_IN_KEYCLOAK';
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
