import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import wordsRouter from "./routes/words.route";
import errorMiddleware from "./middlewares/error.middleware";

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/word", wordsRouter);

app.get("/", (req: Request, res: Response) => console.log("Ok"));

app.use(errorMiddleware);

export default app;
