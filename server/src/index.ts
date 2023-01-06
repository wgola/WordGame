import dotenv from "dotenv";
import app from "./app";
import dbConnect from "./configs/db.config";
import mqttConnect from "./configs/mqtt.config";
import https from "https";
import fs from "fs";

dotenv.config();

dbConnect();

const mqttClient = mqttConnect();

const port = process.env.PORT;

const privateKey = fs.readFileSync(process.env.TLS_KEY, "utf8");
const certificate = fs.readFileSync(process.env.TLS_CERT, "utf8");

const credentials = { key: privateKey, cert: certificate };

const server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});

export { mqttClient };
