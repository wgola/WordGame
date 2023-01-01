import dotenv from "dotenv";
import app from "./app";
import dbConnect from "./configs/db.config";
import mqttConnect from "./configs/mqtt.config";

dotenv.config();

dbConnect();

mqttConnect();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
