import API from "../axios";

export const joinGame = async (gameID: string) =>
  await API.put(`/game/${gameID}`);
