import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["jwt-token"];
  if (token === undefined) return res.sendStatus(401);

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET,
    (err: JsonWebTokenError, decoded: JwtPayload) => {
      if (err) return res.sendStatus(403);

      res.locals.userID = decoded.toString();
      return next();
    }
  );
};

export default auth;
