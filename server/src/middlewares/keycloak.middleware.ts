import { getColorFromString } from "../utils/getColorFromString";
import keycloak from "../configs/keycloak.config";

const protectionMiddleware = keycloak.protect((token, req, res) => {
  const retrievedToken = req.headers.authorization.split(" ")[1];

  const decodedToken = JSON.parse(
    Buffer.from(retrievedToken.split(".")[1], "base64").toString()
  );

  const { sub, preferred_username } = decodedToken;
  res.locals.user = {
    userID: sub,
    username: preferred_username,
    color: getColorFromString(preferred_username),
  };

  return true;
});

export { protectionMiddleware };
