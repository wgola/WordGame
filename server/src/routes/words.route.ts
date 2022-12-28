import express from "express";
import auth from "../middlewares/authentication.middleware";
import { post, get } from "../controllers/words.controller";

const router = express.Router();

router.post("/", auth, post);

router.get("/", auth, get);

export default router;
