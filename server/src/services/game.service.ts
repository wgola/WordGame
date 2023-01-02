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

const getGame = (gameID: string) => {
  return games[gameID] ? games[gameID].toJson() : null;
};

const deleteGame = (gameID: string) => delete games[gameID];

const joinGame = (gameID: string, opponent: Player) =>
  games[gameID] ? games[gameID].setOpponent(opponent) : false;

export { createGame, getGame, deleteGame, joinGame };
