import { Request, Response } from "express";
import {
  createGame as create,
  getGame as get,
  deleteGame as del,
  joinGame as join,
} from "..//services/game.service";
import log from "../configs/logs.config";

const createGame = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const gameID = create({
    userID: user.userID,
    username: user.username,
    color: user.color,
    score: 0,
  });
  log.info(`Created game ${gameID}`);

  return res.send(gameID);
};

const getGame = async (req: Request, res: Response) => {
  log.info(
    `GET request for game ${req.params.gameID} from user ${res.locals.user.userID}`
  );

  return res.json({ gameData: get(req.params.gameID) });
};

const deleteGame = (req: Request, res: Response) => {
  const game = get(req.params.gameID);
  if (game?.host?.userID === res.locals.userID) {
    del(req.params.gameID);
    log.info(
      `DELETE request for game ${req.params.gameID} from user ${res.locals.userID}`
    );

    return res.sendStatus(204);
  }
  log.warn(
    `DELETE request for game ${req.params.gameID} from unauthorized user`
  );

  return res.sendStatus(403);
};

const joinGame = async (req: Request, res: Response) => {
  const user = res.locals.user;
  log.info(
    `PUT request for game ${req.params.gameID} from user ${user.userID}`
  );

  return res.send(
    join(req.params.gameID, {
      userID: user.userID,
      username: user.username,
      color: user.color,
      score: 0,
    })
  );
};

export { createGame, getGame, deleteGame, joinGame };
