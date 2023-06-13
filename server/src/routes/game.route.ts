import express from "express";
import {
  createGame,
  deleteGame,
  getGame,
  joinGame,
} from "../controllers/game.controller";
import { protectionMiddleware } from "../middlewares/keycloak.middleware";

const router = express.Router();

router.post("/", protectionMiddleware, createGame);

router.put("/:gameID/", protectionMiddleware, joinGame);

router.get("/:gameID", protectionMiddleware, getGame);

router.delete("/:gameID", protectionMiddleware, deleteGame);

export default router;
