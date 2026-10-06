# Keycloak + MFA plugins + preconfigured realm (SSO + MFA flows).
# Result: a Keycloak image that, on first start with `--import-realm`, mounts the full `main` realm
# (OIDC client `d9`, browser-sms flow, enforce-mfa, sms-authenticator, hardened reset).

# --- 1. Build the open-source MFA plugins (netzbegruenung) from source ---
FROM maven:3-eclipse-temurin-17 AS plugins
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
ARG MFA_PLUGINS_REF=main
RUN git clone --depth 1 --branch ${MFA_PLUGINS_REF} \
      https://github.com/netzbegruenung/keycloak-mfa-plugins.git /src
WORKDIR /src
RUN mvn -q -DskipTests package

# --- 2. Assemble the Keycloak image with the plugins ---
FROM quay.io/keycloak/keycloak:26.4 AS builder
COPY --from=plugins /src/enforce-mfa/target/*.jar        /opt/keycloak/providers/
COPY --from=plugins /src/sms-authenticator/target/*.jar  /opt/keycloak/providers/
RUN rm -f /opt/keycloak/providers/original-*.jar
RUN /opt/keycloak/bin/kc.sh build

# --- 3. Final image + realm to import ---
FROM quay.io/keycloak/keycloak:26.4
COPY --from=builder /opt/keycloak/ /opt/keycloak/
# The realm is imported on first start when running `start-dev --import-realm`.
COPY realm-export.json /opt/keycloak/data/import/realm-export.json
ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
