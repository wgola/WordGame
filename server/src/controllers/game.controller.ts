import { Request, Response } from "express";
import { findUserByID } from "../services/users.service";
import { createGame as create } from "..//services/game.service";

const createGame = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  const gameID = create({ login: user.username, color: user.color });
  res.send(gameID);
};

export { createGame };
