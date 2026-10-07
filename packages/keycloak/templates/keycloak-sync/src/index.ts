import { KcManager } from "./kc-manager.js";

// d9 SSO provider name (= AUTH_PROVIDERS + prefix of the AUTH_KEYCLOAK_* variables).
const clientName = "keycloak";

// d9 ⇄ Keycloak user-sync plugin. Scope is kept deliberately small:
// create a user in d9 → create it in Keycloak (users.create/update); create a user in
// Keycloak → provision it into d9 at login (auth.create); and sync the role. Nothing more.
export default (
  { filter }: any,
  { env, services, database, logger }: any
) => {
  const { UsersService } = services;
  const kcManager = new KcManager(env, logger);

  // Baseline d9 role granted to every SSO-provisioned user. Empty by default = NO role (the admin assigns
  // it from the d9 admin UI — recommended). Put a d9 role name here to grant a guaranteed minimal role.
  const fallbackRoleName = env.KEYCLOAK_SYNC_DEFAULT_ROLE || process.env.KEYCLOAK_SYNC_DEFAULT_ROLE || "";

  // ── Direction 1: d9 → Keycloak (a user created in d9 with Provider=Keycloak) ─────────────────
  filter(
    "users.create",
    async (payload: any) => {
      // User already linked to Keycloak (created via SSO login, direction 2) → nothing to push back.
      if (payload.external_identifier) return payload;
      // User targeting another provider → leave it alone.
      if (payload.provider && payload.provider !== clientName && payload.provider !== "default") return payload;
      // Only sync users explicitly set to Provider=Keycloak.
      if (payload.provider !== clientName) return payload;

      const kcUser = await kcManager.createUser(clientName, payload);
      payload.external_identifier = kcUser.id; // the Keycloak `sub` = the matching key at login
      payload.provider = clientName;

      // ── Invitation email ──────────────────────────────────────────────────────────────────
      // Sends a link that lets the user set their password (MFA enrollment then happens at first login).
      // Requires an SMTP server on the Keycloak side.
      try {
        await kcManager.sendInvitationEmail(clientName, kcUser.id);
        logger.info(`[keycloak-sync] invitation email sent to ${payload.email}`);
      } catch (err) {
        logger.error(`[keycloak-sync] failed to send invitation email to ${payload.email}`);
        logger.error(err);
      }

      logger.info(`[keycloak-sync] user ${payload.email} created in Keycloak (id=${kcUser.id}).`);
      return payload;
    }
  );

  // ── Direction 1 (update): d9 → Keycloak (email / first name / last name) ──────────────────────
  filter(
    "users.update",
    async (payload: any, meta: any, context: any) => {
      const hasEmail = payload["email"] !== undefined;
      const hasFirstName = payload["first_name"] !== undefined;
      const hasLastName = payload["last_name"] !== undefined;
      if (!hasEmail && !hasFirstName && !hasLastName) return payload;

      const userService = new UsersService(context);
      for (const id of meta.keys) {
        const user = await userService.readOne(id);
        if (user.provider === clientName && user.external_identifier) {
          await kcManager.updateUser(clientName, user.external_identifier, {
            ...(hasEmail && { email: payload.email }),
            ...(hasFirstName && { firstName: payload.first_name }),
            ...(hasLastName && { lastName: payload.last_name }),
          });
        }
      }
      return payload;
    }
  );

  // ── Direction 2: Keycloak → d9 (SSO login of a user created in Keycloak) ──────────────────────
  // d9 auto-creates the account (AUTH_KEYCLOAK_ALLOW_PUBLIC_REGISTRATION=true). By default the new user
  // gets NO role: an admin then assigns it from the d9 admin UI (recommended — identity lives in Keycloak,
  // authorization in d9).
  // Want to drive the role from the identity side (e.g. a brokered enterprise IdP's groups, or a Keycloak
  // realm role exposed as a claim)? The claims are available on `meta.providerPayload.userInfo` — read your
  // claim there and map it to a d9 role by name. See the d9 projen component.
  filter(
    "auth.create",
    async (payload: any) => {
      if (payload.provider !== clientName) return payload;
      if (payload.role || !fallbackRoleName) return payload; // no fallback configured → no role (admin assigns it in d9)
      try {
        const role = await database("directus_roles").where({ name: fallbackRoleName }).first();
        if (role) {
          payload.role = role.id;
          logger.info(`[keycloak-sync] "${payload.email}" → default d9 role "${fallbackRoleName}".`);
        } else {
          logger.warn(`[keycloak-sync] default d9 role "${fallbackRoleName}" not found; user created with no role.`);
        }
      } catch (err: any) {
        logger.error(`[keycloak-sync] role lookup failed: ${err?.message}`);
      }
      return payload;
    }
  );
};
