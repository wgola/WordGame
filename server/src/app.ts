import express, { Express, Request, Response } from "express";
import keycloak from "./configs/keycloak.config";
import wordsRouter from "./routes/words.route";
import gameRouter from "./routes/game.route";
import cookieParser from "cookie-parser";
import log from "./configs/logs.config";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import games from "./games";
import cors from "cors";
import http from "http";

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
app.use(keycloak.middleware());

app.use("/word", wordsRouter);

app.use("/game", gameRouter);

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to ScrabbleProject API")
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  log.info(`Socket ${socket.id} connected`);

  socket.on("join-game", (gameID) => {
    socket.join(gameID);

    socket.on("connected", (data) => {
      io.to(gameID).emit("connected", data);
    });

    socket.on("checkWord", (data) => {
      if (games[gameID]) {
        games[gameID].onWordCheck(data);
      }
    });

    socket.on("chat", (data) => {
      io.to(gameID).emit("chat", data);
    });

    socket.on("info", (data) => {
      io.to(gameID).emit("info", data);
    });

    socket.on("deleted", (data) => {
      io.to(gameID).emit("deleted", data);
    });
  });

  socket.on("disconnect", () => {
    log.info(`Socket ${socket.id} disconnected`);
  });
});

export { server, io };
