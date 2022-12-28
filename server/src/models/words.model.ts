import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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

wordSchema.plugin(mongoosePaginate);

const words = mongoose.model<Word, mongoose.PaginateModel<Word>>(
  "Words",
  wordSchema,
  "words"
);

export default words;
