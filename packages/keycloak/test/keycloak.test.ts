import { D9Project } from '@wbce/projen-d9';
import { Testing } from 'projen';
import { Keycloak } from '../src';

const opts = {
  issuerUrl: 'https://auth.example.com',
  apiUrl: 'https://api.example.com',
  frontUrl: 'https://app.example.com',
};

describe('Keycloak component', () => {
  test('emits the realm, the Keycloak Dockerfile and the sync hook', () => {
    const project = new D9Project({ name: 'test-kc', defaultReleaseBranch: 'main' });
    new Keycloak(project, opts);
    const out = Testing.synth(project);

    expect(Object.keys(out)).toEqual(
      expect.arrayContaining([
        'keycloak/realm-export.json',
        'keycloak/Dockerfile',
        'plugins/keycloak-sync/package.json',
        'plugins/keycloak-sync/src/index.ts',
        'plugins/keycloak-sync/src/kc-manager.ts',
      ]),
    );

    const realm = out['keycloak/realm-export.json'];
    expect(realm.realm).toBe('main');
    expect(realm.sslRequired).toBe('external');
    expect(realm.smtpServer).toBeUndefined(); // no SMTP unless the `smtp` option is set
  });

  test('injects the OIDC env on the d9 service', () => {
    const project = new D9Project({ name: 'test-env', defaultReleaseBranch: 'main' });
    new Keycloak(project, opts);
    // Testing.synth returns .json as objects but .yml as a raw string → assert on the compose text.
    const compose = Testing.synth(project)['docker-compose.yml'] as unknown as string;

    expect(compose).toContain('AUTH_PROVIDERS: keycloak');
    expect(compose).toContain('AUTH_KEYCLOAK_CLIENT_ID: d9');
    expect(compose).toContain(
      'AUTH_KEYCLOAK_ISSUER_URL: https://auth.example.com/realms/main/.well-known/openid-configuration',
    );
    expect(compose).toContain('PUBLIC_URL: https://api.example.com');
    expect(compose).toContain('AUTH_KEYCLOAK_REDIRECT_ALLOW_LIST: https://app.example.com');
  });

  test('the client secret is an env passthrough, never a hardcoded value', () => {
    const project = new D9Project({ name: 'test-secret', defaultReleaseBranch: 'main' });
    new Keycloak(project, opts);
    const out = Testing.synth(project);
    const compose = out['docker-compose.yml'] as unknown as string;
    const realm = JSON.stringify(out['keycloak/realm-export.json']);

    expect(compose).toContain('AUTH_KEYCLOAK_CLIENT_SECRET: ${AUTH_KEYCLOAK_CLIENT_SECRET}');
    expect(compose).not.toContain('d9-local-dev-secret');
    expect(realm).not.toContain('d9-local-dev-secret');
  });

  test('custom realm/clientId are applied to the realm and the issuer', () => {
    const project = new D9Project({ name: 'test-custom', defaultReleaseBranch: 'main' });
    new Keycloak(project, { ...opts, realm: 'corp', clientId: 'backend' });
    const out = Testing.synth(project);

    expect(out['keycloak/realm-export.json'].realm).toBe('corp');
    const d9Client = out['keycloak/realm-export.json'].clients.find((c: any) => c.clientId === 'backend');
    expect(d9Client).toBeDefined();
    expect(out['docker-compose.yml'] as unknown as string).toContain('/realms/corp/');
  });

  test('smtp option configures the realm SMTP server', () => {
    const project = new D9Project({ name: 'test-smtp', defaultReleaseBranch: 'main' });
    new Keycloak(project, {
      ...opts,
      smtp: { host: 'smtp.example.com', from: 'no-reply@example.com', user: 'U', password: 'P' },
    });
    const smtp = Testing.synth(project)['keycloak/realm-export.json'].smtpServer;

    expect(smtp.host).toBe('smtp.example.com');
    expect(smtp.auth).toBe('true');
    expect(smtp.starttls).toBe('true');
  });

  test('the realm ships SMS MFA in simulation mode (out-of-the-box E2E)', () => {
    const project = new D9Project({ name: 'test-sms', defaultReleaseBranch: 'main' });
    new Keycloak(project, opts);
    const realm = Testing.synth(project)['keycloak/realm-export.json'];
    const smsCfgs = (realm.authenticatorConfig || []).filter((c: any) => c.config && 'simulation' in c.config);

    expect(smsCfgs.length).toBeGreaterThan(0);
    expect(smsCfgs.every((c: any) => c.config.simulation === 'true')).toBe(true);
  });

  test('mfa defaults to on (custom browser-sms + hardened reset flows)', () => {
    const project = new D9Project({ name: 'test-mfa-on', defaultReleaseBranch: 'main' });
    new Keycloak(project, opts);
    const realm = Testing.synth(project)['keycloak/realm-export.json'];
    expect(realm.browserFlow).toBe('browser-sms');
    expect(realm.resetCredentialsFlow).toBe('Reset - Conditional OTP / reset-otp');
  });

  test('mfa:false uses the standard login flow (SSO only, no second factor)', () => {
    const project = new D9Project({ name: 'test-mfa-off', defaultReleaseBranch: 'main' });
    new Keycloak(project, { ...opts, mfa: false });
    const out = Testing.synth(project);
    const realm = out['keycloak/realm-export.json'];

    expect(realm.browserFlow).toBe('browser'); // original, non-custom login
    expect(realm.resetCredentialsFlow).toBe('reset credentials'); // original, non-custom reset
    // the OIDC wiring + sync hook are unchanged
    expect(Object.keys(out)).toContain('plugins/keycloak-sync/src/index.ts');
  });

  test('userSync:false skips the hook', () => {
    const project = new D9Project({ name: 'test-nosync', defaultReleaseBranch: 'main' });
    new Keycloak(project, { ...opts, userSync: false });
    expect(Object.keys(Testing.synth(project))).not.toContain('plugins/keycloak-sync/src/index.ts');
  });
});
