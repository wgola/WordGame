import keycloak from "../../keycloak";
import API from "../axios";

export const createGame = async () => {
  await keycloak.updateToken(30);

  return await API.post(
    "/game",
    {},
    {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    }
  );
};
