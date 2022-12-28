import { NextFunction, Request, Response } from "express";
import { checkIfWordExists, getWordsPage } from "../services/words.service";

const post = async (req: Request, res: Response, next: NextFunction) =>
  res.send(await checkIfWordExists(req.body.word.toUpperCase()));

const get = async (req: Request, res: Response, next: NextFunction) => {
  const word = !!req.query.word ? req.query.word.toString().toUpperCase() : "";
  res.send(
    await getWordsPage(
      word,
      parseInt(req.query.page as string),
      parseInt(req.query.limit as string)
    )
  );
};

export { post, get };
