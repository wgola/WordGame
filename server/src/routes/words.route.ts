import express from "express";
import * as wordsController from "../controllers/words.controller";

const router = express.Router();

router.get("/", wordsController.get);

export default router;
