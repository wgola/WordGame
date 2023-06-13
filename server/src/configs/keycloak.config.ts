import NodeAdapter from "keycloak-connect";

const config = {
  "confidential-port": 8443,
  realm: "WordGame",
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  resource: "WordGameServer",
  realmPublicKey: process.env.REALM_PUBLIC_KEY,
  "bearer-only": true,
};

const keycloak = new NodeAdapter({}, config);

export default keycloak;
