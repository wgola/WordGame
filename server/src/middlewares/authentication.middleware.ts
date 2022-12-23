import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["jwt-token"];
  if (token === undefined) res.sendStatus(401);

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET,
    (err: JsonWebTokenError, decoded: JwtPayload) => {
      if (err) res.sendStatus(403);

      const userID = req.params.userID;
      userID === undefined || userID === decoded.userID
        ? next()
        : res.sendStatus(403);
    }
  );
};

export default auth;
