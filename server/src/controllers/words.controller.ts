import { NextFunction, Request, Response } from "express";
import log from "../configs/logs.config";
import { getWordsPage } from "../services/words.service";

const get = async (req: Request, res: Response, next: NextFunction) => {
  const word = !!req.query.word ? req.query.word.toString().toUpperCase() : "";

  log.info(
    `GET request for words page ${req.query.page}, limit ${req.query.limit}, word to find ${word} from user ${res.locals.user.userID}`
  );
  return res.send(
    await getWordsPage(
      word,
      parseInt(req.query.page as string),
      parseInt(req.query.limit as string)
    )
  );
};

export { get };
