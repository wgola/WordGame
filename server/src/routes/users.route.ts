import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  authorize,
  getUser,
  login,
  register,
} from "../controllers/users.controller";

const router = express.Router();

router.get("/authorize", auth, authorize);

router.post("/login", login);

router.post("/register", register);

router.get("/:userID", auth, getUser);

export default router;
