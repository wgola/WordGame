import keycloak from "../../keycloak";
import API from "../axios";

export const deleteGame = async (gameID: string | undefined) =>
  await API.delete(`/game/${gameID}`, {
    headers: { Authorization: `Bearer ${keycloak.token}` },
  });
