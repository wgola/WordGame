import keycloak from "../../keycloak";
import API from "../axios";

export const createGame = async () =>
  await API.post("/game", {
    Headers: { Authentication: `Bearer ${keycloak.token}` },
  });
