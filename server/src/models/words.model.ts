import mongoose from "mongoose";
import { Word } from "../types/Word";

const { Schema } = mongoose;

const wordSchema = new Schema<Word>({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
});

const words = mongoose.model<Word>("Words", wordSchema, "words");

export default words;
