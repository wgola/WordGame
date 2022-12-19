import mongoose from "mongoose";

const { Schema } = mongoose;

const wordSchema = new Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const words = mongoose.model("Words", wordSchema, "words");

export default words;
