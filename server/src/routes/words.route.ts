import express from "express";
import {
  keycloak,
  protectionMiddleware,
} from "../middlewares/keycloak.middleware";
import { get } from "../controllers/words.controller";

const router = express.Router();

router.get("/", keycloak.protect(protectionMiddleware), get);

export default router;
