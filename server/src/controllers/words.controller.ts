import { NextFunction, Request, Response } from "express";
import { checkIfWordExists } from "../services/words.service";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const wordToCheck = req.body.word.toUpperCase();
  res.send(await checkIfWordExists(wordToCheck));
};

export { get };
