import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import wordsRouter from "./routes/words.route";
import usersRouter from "./routes/users.route";
import gameRouter from "./routes/game.route";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import log from "./configs/logs.config";

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

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to ScrabbleProject API")
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  log.info(`Socket ${socket.id} connected`);
  let gameID: string;

  socket.on("join-game", (data) => {
    gameID = data;
    socket.join(gameID);
  });

  socket.on("disconnect", () => {
    socket.leave(gameID);
    log.info(`Socket ${socket.id} disconnected`);
  });
});

export { server, io };
