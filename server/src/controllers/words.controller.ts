import { NextFunction, Request, Response } from "express";
import * as wordsService from "../services/words.service";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const wordToCheck = req.body.word.toUpperCase();
  res.send(await wordsService.checkIfWordExists(wordToCheck));
};

export { get };
