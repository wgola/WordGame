import API from "./axios";

export const createGame = async () => await API.post("/game/create");
