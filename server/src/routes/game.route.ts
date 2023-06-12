import express from "express";
import auth from "../middlewares/authentication.middleware";
import {
  createGame,
  deleteGame,
  getGame,
  joinGame,
} from "../controllers/game.controller";
import {
  protectionMiddleware,
  keycloak,
} from "../middlewares/keycloak.middleware";

const router = express.Router();

router.post("/", keycloak.protect(protectionMiddleware), createGame);

router.put("/:gameID/", keycloak.protect(protectionMiddleware), joinGame);

router.get("/:gameID", keycloak.protect(protectionMiddleware), getGame);

router.delete("/:gameID", keycloak.protect(protectionMiddleware), deleteGame);

export default router;
