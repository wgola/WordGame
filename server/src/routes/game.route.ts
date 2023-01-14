import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  createGame,
  deleteGame,
  getGame,
  joinGame,
} from "../controllers/game.controller";

const router = express.Router();

router.post("/", auth, createGame);

router.put("/:gameID/", auth, joinGame);

router.get("/:gameID", auth, getGame);

router.delete("/:gameID", auth, deleteGame);

export default router;
