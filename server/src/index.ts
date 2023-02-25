import { Server as WsServer } from "socket.io";
import { Server as HttpServer } from "http";
import dbConnect from "./configs/db.config";
import log from "./configs/logs.config";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

dbConnect();

const port = process.env.PORT || 8000;

const server = new HttpServer(app);

const io = new WsServer(server);

server.listen(port, () =>
  log.info(`Server is running at http://localhost:${port}`)
);

export { io };
