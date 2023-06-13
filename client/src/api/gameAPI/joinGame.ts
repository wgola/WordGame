import keycloak from "../../keycloak";
import API from "../axios";

export const joinGame = async (gameID: string) => {
  await keycloak.updateToken(30);

  return await API.put(
    `/game/${gameID}`,
    {},
    {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    }
  );
};
