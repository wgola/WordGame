import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { chechUserLogin, createUser } from "../services/users.service";

const login = async (req: Request, res: Response) => {
  const user = await chechUserLogin(req.body.username, req.body.password);
  if (user === null) res.sendStatus(401);
  else {
    const accessToken = jsonwebtoken.sign(user._id, process.env.JWT_SECRET);
    res.json({ accessToken: accessToken });
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

export { login, register };
