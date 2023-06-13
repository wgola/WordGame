import keycloak from "../../keycloak";
import API from "../axios";

export const getGame = async (gameID: string | undefined) => {
  await keycloak.updateToken(30);

  return await API.get(`/game/${gameID}`, {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  });
};
