import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import {
  checkUserLogin,
  createUser,
  findUserByID,
  updateUserByID,
} from "../services/users.service";

const authorize = (req: Request, res: Response) => res.sendStatus(200);

const login = async (req: Request, res: Response) => {
  const user = await checkUserLogin(req.body.username, req.body.password);
  if (user === null) return res.sendStatus(401);

  const accessToken = jsonwebtoken.sign(
    user._id.toString(),
    process.env.JWT_SECRET
  );

  res.cookie("jwt-token", accessToken, {
    httpOnly: true,
  });

  return res.json({ userData: user });
};

const register = async (req: Request, res: Response) =>
  (await createUser(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.color
  ))
    ? res.sendStatus(201)
    : res.sendStatus(500);

const getUser = async (req: Request, res: Response) => {
  const user = await findUserByID(req.params.userID);
  return user ? res.json({ userData: user }) : res.sendStatus(404);
};

const updateUser = async (req: Request, res: Response) => {
  const ifUserUpdated = await updateUserByID(
    req.params.userID,
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.color
  );
  return ifUserUpdated
    ? res.json({ userData: await findUserByID(req.params.userID) })
    : res.sendStatus(500);
};

export { authorize, login, register, getUser, updateUser };
