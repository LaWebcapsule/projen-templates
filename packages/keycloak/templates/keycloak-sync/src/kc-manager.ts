import KcAdminClient from "@keycloak/keycloak-admin-client";

// Helper around the Keycloak admin API.
// Ported (sanitized) from our production d9 backends:
//  - derives the client credentials from d9's AUTH_<CLIENT>_* variables;
//  - authenticates with client_credentials (the Keycloak client must have "Service accounts" enabled
//    + the realm-management role `manage-users`);
//  - caches the authenticated client (re-auth every 60s — see below).
export class KcManager {
  constructor(private env: any, private logger: any) {}

  authenticatedClients: Map<
    string,
    { client: KcAdminClient; clientId: string; lastAuthenticationDate: Date }
  > = new Map();

  async authenticateClient(clientName: string) {
    const clientIDEnvName = `AUTH_${clientName.toUpperCase()}_CLIENT_ID`;
    const clientSecretEnvName = `AUTH_${clientName.toUpperCase()}_CLIENT_SECRET`;
    const keycloakUrlEnvName = `AUTH_${clientName.toUpperCase()}_ISSUER_URL`;

    if (!this.env[clientIDEnvName] || !this.env[clientSecretEnvName] || !this.env[keycloakUrlEnvName]) {
      throw new Error(
        `Environment variables ${clientIDEnvName}, ${clientSecretEnvName} and ${keycloakUrlEnvName} for client ${clientName} are not set.`
      );
    }

    if (!this.authenticatedClients.get(clientName)) {
      const realm = this.extractRealm(this.env[keycloakUrlEnvName]);
      const baseUrl = this.extractBaseUrl(this.env[keycloakUrlEnvName]);
      this.logger.info(`[keycloak-sync] KC base URL: ${baseUrl} (realm ${realm})`);
      const kcAdminClient = new KcAdminClient({ baseUrl, realmName: realm });
      this.authenticatedClients.set(clientName, {
        client: kcAdminClient,
        clientId: this.env[clientIDEnvName],
        lastAuthenticationDate: new Date(0),
      });
    }

    const kcClient = this.authenticatedClients.get(clientName)!;
    // Re-authenticate if the token is older than 60s. Keycloak access tokens expire quickly
    // (accessTokenLifespan = 300s by default): too long a cache returns an expired token → 401. 60s is
    // well under the lifespan, without re-authenticating on every call for back-to-back operations.
    if (kcClient.lastAuthenticationDate.getTime() < Date.now() - 60 * 1000) {
      await kcClient.client.auth({
        grantType: "client_credentials",
        clientId: this.env[clientIDEnvName],
        clientSecret: this.env[clientSecretEnvName],
      });
      this.authenticatedClients.set(clientName, {
        client: kcClient.client,
        clientId: kcClient.clientId,
        lastAuthenticationDate: new Date(),
      });
    }
    return this.authenticatedClients.get(clientName)!.client;
  }

  extractRealm(url: string) {
    const parts = url.split("/");
    const realmsIndex = parts.indexOf("realms");
    if (realmsIndex !== -1 && realmsIndex < parts.length - 1) return parts[realmsIndex + 1];
    return null;
  }

  extractBaseUrl(url: string) {
    return new URL(url).origin;
  }

  async createUser(clientName: string, user: any) {
    const kcClient = await this.authenticateClient(clientName);
    return kcClient.users.create({
      username: user.email.split("@")[0],
      email: user.email,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      enabled: true,
      emailVerified: true,
    });
  }

  // Sends the invitation email (a link that only sets the password, with no client or redirect so MFA
  // enrollment is not bypassed). Requires an SMTP server configured on the Keycloak side.
  async sendInvitationEmail(clientName: string, userId: string, options: { lifespanSeconds?: number } = {}) {
    await this.authenticateClient(clientName);
    const cached = this.authenticatedClients.get(clientName)!;
    return cached.client.users.executeActionsEmail({
      id: userId,
      lifespan: options.lifespanSeconds ?? 86400,
      actions: ["UPDATE_PASSWORD"],
    });
  }

  async updateUser(
    clientName: string,
    userId: string,
    attrs: { email?: string; firstName?: string; lastName?: string }
  ) {
    const kcClient = await this.authenticateClient(clientName);
    const updatePayload: any = {};
    if (attrs.email !== undefined) {
      updatePayload.email = attrs.email;
      updatePayload.emailVerified = true;
    }
    if (attrs.firstName !== undefined) updatePayload.firstName = attrs.firstName;
    if (attrs.lastName !== undefined) updatePayload.lastName = attrs.lastName;
    return kcClient.users.update({ id: userId }, updatePayload);
  }

  async deleteUser(clientName: string, userId: string) {
    const kcClient = await this.authenticateClient(clientName);
    return kcClient.users.del({ id: userId });
  }
}
