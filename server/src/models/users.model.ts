import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
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
});

const users = mongoose.model("Users", userSchema, "users");

export default users;
