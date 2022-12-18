import mongoose from "mongoose";

const { Schema } = mongoose;

const wordSchema = new Schema({
  word: String,
  description: String,
});

const words = mongoose.model("Words", wordSchema, "words");

export default words;
