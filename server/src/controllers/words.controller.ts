import { NextFunction, Request, Response } from "express";
import { checkIfWordExists } from "../services/words.service";

const post = async (req: Request, res: Response, next: NextFunction) => {
  const wordToCheck = req.body.word.toUpperCase();
  res.send(await checkIfWordExists(wordToCheck));
};

export { post };
