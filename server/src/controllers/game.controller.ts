import { Request, Response } from "express";
import { findUserByID } from "../services/users.service";
import {
  createGame as create,
  getGame as get,
  deleteGame as del,
  joinGame as join,
} from "..//services/game.service";

const createGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  const gameID = create({
    userID: res.locals.userID,
    username: user.username,
    color: user.color,
    score: 0,
  });
  res.send(gameID);
};

const getGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  return user
    ? res.json({ userData: user, gameData: get(req.params.gameID) })
    : res.sendStatus(404);
};

const deleteGame = (req: Request, res: Response) => {
  const game = get(req.params.gameID);
  if (game.host.userID === res.locals.userID) {
    del(req.params.gameID);
    res.sendStatus(204);
  } else res.sendStatus(403);
};

const joinGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  res.send(
    join(req.params.gameID, {
      userID: res.locals.userID,
      username: user.username,
      color: user.color,
      score: 0,
    })
  );
};

export { createGame, getGame, deleteGame, joinGame };
