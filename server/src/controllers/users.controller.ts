import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import log from "../configs/logs.config";
import {
  checkUserLogin,
  createUser,
  deleteUserByID,
  findUserByID,
  updateUserByID,
} from "../services/users.service";

const login = async (req: Request, res: Response) => {
  const user = await checkUserLogin(req.body.username, req.body.password);
  if (user === null) {
    log.warn("POST request for login by unknown user");
    return res.sendStatus(401);
  }

  const accessToken = jsonwebtoken.sign(
    user._id.toString(),
    process.env.JWT_SECRET
  );

  res.cookie("jwt-token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  log.info(`POST request for login from user ${user.id}`);

  return res.json({ userData: user });
};

const logout = async (req: Request, res: Response) => {
  log.info(`POST request for logout from user ${res.locals.userID}`);

  return res.clearCookie("jwt-token").sendStatus(200);
};

const register = async (req: Request, res: Response) => {
  const ifUserCreated = await createUser(
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.color
  );

  if (ifUserCreated) {
    log.info("POST request for register succesfull");
    return res.sendStatus(201);
  }

  log.error("POST request for register ended with error");
  return res.sendStatus(500);
};

const getUser = async (req: Request, res: Response) => {
  const user = await findUserByID(res.locals.userID);
  if (user) {
    log.info(`GET request for user data from ${user.id}`);
    return res.json({ userData: user });
  }

  log.warn("GET request for user data from unknown user");
  return res.sendStatus(404);
};

const updateUser = async (req: Request, res: Response) => {
  const ifUserUpdated = await updateUserByID(
    res.locals.userID,
    req.body.username,
    req.body.email,
    req.body.color
  );

  if (ifUserUpdated) {
    log.info(`PUT request for user data from ${res.locals.userID}`);
    return res.json({ userData: await findUserByID(res.locals.userID) });
  }

  log.error("PUT request for user data ended with error");
  return res.sendStatus(500);
};

const deleteUser = async (req: Request, res: Response) => {
  const ifUserDeleted = await deleteUserByID(res.locals.userID);

  if (ifUserDeleted) {
    log.info(`DELETE request for user from user ${res.locals.userID}`);
    return res.clearCookie("jwt-token").sendStatus(204);
  }

  log.info("DELETE request for user ended with error");
  return res.sendStatus(500);
};

export { login, logout, register, getUser, updateUser, deleteUser };
