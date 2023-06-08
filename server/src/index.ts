import dbConnect from "./configs/db.config";
import log from "./configs/logs.config";
import dotenv from "dotenv";
import server from "./app";

dotenv.config();

dbConnect();

const port = process.env.PORT || 8000;

server.listen(port, () =>
  log.info(`Server is running at http://localhost:${port}`)
);
