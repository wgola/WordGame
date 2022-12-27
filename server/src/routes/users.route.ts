import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  deleteUser,
  getUser,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/users.controller";

const router = express.Router();

router.post("/login", login);

router.post("/logout", auth, logout);

router.post("/register", register);

router.get("/", auth, getUser);

router.put("/", auth, updateUser);

router.delete("/", auth, deleteUser);

export default router;
