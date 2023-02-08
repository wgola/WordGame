import mqttConnect from "./configs/mqtt.config";
import dbConnect from "./configs/db.config";
import log from "./configs/logs.config";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

dbConnect();

const mqttClient = mqttConnect();

const port = process.env.PORT || 8000;

app.listen(port, () =>
  log.info(`Server is running at https://localhost:${port}`)
);

export { mqttClient };
