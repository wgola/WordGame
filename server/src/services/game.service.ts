import { Player } from "../types/Player";
import * as uuid from "short-uuid";
import Game from "../Game";

const games: { [index: string]: Game } = {};

const createGame = (host: Player) => {
  const gameID = uuid.generate();
  const newGame = new Game(gameID, host);
  games[gameID] = newGame;
  return gameID;
};

export { createGame };
