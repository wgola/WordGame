import { Server } from "socket.io";
import server from "../app";
import log from "./logs.config";

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

export default io;
