import NodeAdapter from "keycloak-connect";
import { config } from "../keycloak";
const keycloak = new NodeAdapter({}, config);

const protectionMiddleware: NodeAdapter.GuardFn = (
  token,
  req,
  res
): boolean => {
  const retrievedToken = req.headers.authorization.split(" ")[1];

  const decodedToken = JSON.parse(
    Buffer.from(retrievedToken.split(".")[1], "base64").toString()
  );

  const { sub, preferred_username } = decodedToken;
  res.locals.user = {
    userID: sub,
    username: preferred_username,
    color: "#abcdef",
  };

  return true;
};

export { keycloak, protectionMiddleware };
