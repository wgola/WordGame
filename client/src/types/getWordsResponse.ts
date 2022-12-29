import { wordType } from "./wordType";

export interface getWordsResponse {
  docs: Array<wordType>;
  totalDocs: number;
  totalPages: number;
}
