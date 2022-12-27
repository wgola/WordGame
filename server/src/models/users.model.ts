import mongoose from "mongoose";
import { User } from "../types/User";

const { Schema } = mongoose;

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const users = mongoose.model<User>("Users", userSchema, "users");

export default users;
