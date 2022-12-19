import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) res.sendStatus(401);
  else
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET,
      (err: JsonWebTokenError, decoded: JwtPayload) => {
        if (err) res.sendStatus(403);
        else {
          const userID = req.params.userID;
          if (userID === null || userID === decoded.userID) next();
          else res.sendStatus(403);
        }
      }
    );
};

export default auth;
