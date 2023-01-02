import express from "express";
import auth from "../middlewares/authentication.middleware";
import { createGame } from "../controllers/game.controller";

const router = express.Router();

router.post("/create", auth, createGame);
