import express from "express";
import auth from "../middlewares/authentication.middleware";
import * as wordsController from "../controllers/words.controller";

const router = express.Router();

router.get("/", auth, wordsController.get);

export default router;
