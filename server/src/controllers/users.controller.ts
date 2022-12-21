import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { chechUserLogin, createUser } from "../services/users.service";

const authorize = (req: Request, res: Response) => res.sendStatus(200);

const login = async (req: Request, res: Response) => {
  const user = await chechUserLogin(req.body.username, req.body.password);
  if (user === null) res.sendStatus(401);
  else {
    const accessToken = jsonwebtoken.sign(
      user._id.toString(),
      process.env.JWT_SECRET
    );
    res.cookie("jwt-token", accessToken, {
      httpOnly: true,
    });
    res.json({ userID: user._id.toString() });
  }
};

const register = async (req: Request, res: Response) => {
  const registered = await createUser(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.color
  );
  registered ? res.sendStatus(201) : res.sendStatus(500);
};

export { authorize, login, register };
