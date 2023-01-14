import express from "express";
import auth from "../middlewares/authentication.middleware";
import { get } from "../controllers/words.controller";

const router = express.Router();

router.get("/", auth, get);

export default router;
