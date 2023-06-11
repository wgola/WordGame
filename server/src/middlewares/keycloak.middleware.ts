import NodeAdapter from "keycloak-connect";
import { config } from "../keycloak";
import { decode } from "jsonwebtoken";
const keycloak = new NodeAdapter({}, config);

const protectionMiddleware: NodeAdapter.GuardFn = (
  token,
  req,
  res
): boolean => {
  const retrievedToken = req.headers.authorization.split(" ")[1];
  const decoded = JSON.parse(decode(retrievedToken).toString());

  const { sub, preferred_username } = decoded;
  res.locals.user = {
    userID: sub,
    username: preferred_username,
    color: "#abcdef", ////poprwaić!!!
  };

  return true;
};

export { keycloak, protectionMiddleware };
