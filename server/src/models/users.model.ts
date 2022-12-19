import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  login: String,
  password: String,
  color: String,
});

const users = mongoose.model("Users", userSchema, "users");

export default users;
