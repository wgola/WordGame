import express from "express";
import { protectionMiddleware } from "../middlewares/keycloak.middleware";
import { get } from "../controllers/words.controller";

const router = express.Router();

router.get("/", protectionMiddleware, get);

export default router;
