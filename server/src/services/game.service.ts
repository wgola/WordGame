import { Player } from "../types/Player";
import * as uuid from "short-uuid";
import Game from "../Game";
import { mqttClient } from "../index";
import log from "../configs/logs.config";

const games: { [index: string]: Game } = {};

const createGame = (host: Player) => {
  const gameID = uuid.generate();
  const newGame = new Game(gameID, host, mqttClient);
  games[gameID] = newGame;
  log.info(`Game ${gameID} created by user ${host.userID}`);
  return gameID;
};

const getGame = (gameID: string) => {
  log.info(`Returned game ${gameID} data`);
  return games[gameID] ? games[gameID].toJson() : null;
};

const deleteGame = (gameID: string) => {
  log.info(`Deleted game ${gameID}`);
  return delete games[gameID];
};

const joinGame = (gameID: string, opponent: Player) => {
  if (games[gameID]) {
    log.info(`Trying to set opponent for game ${gameID}`);
    return games[gameID].setOpponent(opponent);
  }

  log.warn(`Couldn't find game ${gameID}`);
  return false;
};

export { createGame, getGame, deleteGame, joinGame };
