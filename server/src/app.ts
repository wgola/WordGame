import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import wordsRouter from "./routes/words.route";
import usersRouter from "./routes/users.route";
import gameRouter from "./routes/game.route";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", usersRouter);

app.use("/word", wordsRouter);

app.use("/game", gameRouter);

app.get("/", (req: Request, res: Response) => console.log("Ok"));

export default app;
