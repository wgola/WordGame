import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  createGame,
  deleteGame,
  getGame,
  joinGame,
} from "../controllers/game.controller";

const router = express.Router();

router.post("/create", auth, createGame);

router.post("/:gameID/join", auth, joinGame);

router.get("/:gameID", auth, getGame);

router.delete("/:gameID", auth, deleteGame);

export default router;
