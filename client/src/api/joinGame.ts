import API from "./axios";

export const joinGame = async (gameID: string) =>
  await API.post(`/game/${gameID}/join`);
