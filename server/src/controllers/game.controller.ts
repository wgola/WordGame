import { Request, Response } from "express";
import { findUserByID } from "../services/users.service";
import {
  createGame as create,
  getGame as get,
  deleteGame as del,
  joinGame as join,
} from "..//services/game.service";
import log from "../configs/logs.config";

const createGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  const gameID = create({
    userID: res.locals.userID,
    username: user.username,
    color: user.color,
    score: 0,
  });
  log.info(`Created game ${gameID}`);

  return res.send(gameID);
};

const getGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  if (user) {
    log.info(`GET request for game ${req.params.gameID} from user ${user.id}`);

    return res.json({ userData: user, gameData: get(req.params.gameID) });
  }

  log.warn(`GET request for game ${req.params.gameID} from unauthorized user`);

  return res.sendStatus(404);
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
  const user = await findUserByID(res.locals.userID);
  log.info(`PUT request for game ${req.params.gameID} from user ${user.id}`);

  return res.send(
    join(req.params.gameID, {
      userID: res.locals.userID,
      username: user.username,
      color: user.color,
      score: 0,
    })
  );
};

export { createGame, getGame, deleteGame, joinGame };
