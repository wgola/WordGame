import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  authorize,
  deleteUser,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/users.controller";

const router = express.Router();

router.get("/authorize", auth, authorize);

router.post("/login", login);

router.post("/register", register);

router.get("/:userID", auth, getUser);

router.put("/:userID", auth, updateUser);

router.delete("/:userID", auth, deleteUser);

export default router;
