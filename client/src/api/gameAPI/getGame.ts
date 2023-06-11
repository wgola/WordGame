import keycloak from "../../keycloak";
import API from "../axios";

export const getGame = async (gameID: string | undefined) =>
  await API.get(`/game/${gameID}`, {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  });
