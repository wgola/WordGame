import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import {
  checkUserLogin,
  createUser,
  deleteUserByID,
  findUserByID,
  updateUserByID,
} from "../services/users.service";

const login = async (req: Request, res: Response) => {
  const user = await checkUserLogin(req.body.username, req.body.password);
  if (user === null) return res.sendStatus(401);

  const accessToken = jsonwebtoken.sign(
    user._id.toString(),
    process.env.JWT_SECRET
  );

  res.cookie("jwt-token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return res.json({ userData: user });
};

const logout = async (req: Request, res: Response) =>
  res.clearCookie("jwt-token").sendStatus(200);

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
  const user = await findUserByID(res.locals.userID);
  return user ? res.json({ userData: user }) : res.sendStatus(404);
};

const updateUser = async (req: Request, res: Response) => {
  const ifUserUpdated = await updateUserByID(
    res.locals.userID,
    req.body.username,
    req.body.email,
    req.body.color
  );
  return ifUserUpdated
    ? res.json({ userData: await findUserByID(res.locals.userID) })
    : res.sendStatus(500);
};

const deleteUser = async (req: Request, res: Response) =>
  (await deleteUserByID(res.locals.userID))
    ? res.clearCookie("jwt-token").sendStatus(204)
    : res.sendStatus(500);

export { login, logout, register, getUser, updateUser, deleteUser };
