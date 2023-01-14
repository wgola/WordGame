import mongoose from "mongoose";
import log from "./logs.config";

const dbConnect = () => {
  mongoose.set("strictQuery", false);

  const connectionString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_PATH}`;

  mongoose
    .connect(connectionString)
    .then(() => log.info("Connected to MongoDB"))
    .catch((err) => log.error(err));
};

export default dbConnect;
