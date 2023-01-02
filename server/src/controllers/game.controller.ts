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
  });
  res.send(gameID);
};

const getGame = (req: Request, res: Response) =>
  res.json(get(req.params.gameID));

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
    })
  );
};

export { createGame, getGame, deleteGame, joinGame };
