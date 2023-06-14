import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "wordgame",
  clientId: "WordGameClient",
});

export default keycloak;
