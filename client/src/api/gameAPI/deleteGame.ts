import API from "../axios";

export const deleteGame = async (gameID: string | undefined) =>
  await API.delete(`/game/${gameID}`);
