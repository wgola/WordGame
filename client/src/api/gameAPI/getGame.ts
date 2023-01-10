import API from "../axios";

export const getGame = async (gameID: string | undefined) =>
  await API.get(`/game/${gameID}`);
