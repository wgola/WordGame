import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import log from "../configs/logs.config";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["jwt-token"];

  if (token === undefined) {
    log.warn("Unauthorized user");
    return res.sendStatus(401);
  }

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET,
    (err: JsonWebTokenError, decoded: JwtPayload) => {
      if (err) {
        log.warn("Unauthorized user");
        return res.sendStatus(403);
      }

      log.info(`User ${decoded.toString()} authorized`);
      res.locals.userID = decoded.toString();
      return next();
    }
  );
};

export default auth;
