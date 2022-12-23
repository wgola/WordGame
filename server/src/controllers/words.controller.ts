import { NextFunction, Request, Response } from "express";
import { checkIfWordExists } from "../services/words.service";

const post = async (req: Request, res: Response, next: NextFunction) =>
  res.send(await checkIfWordExists(req.body.word.toUpperCase()));

export { post };
