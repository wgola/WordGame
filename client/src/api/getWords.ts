import { getWordsResponse } from "../types";
import API from "./axios";

export const getWords = async (
  word: string,
  page: number,
  limit: number
): Promise<getWordsResponse> => {
  const result = await API.get(
    `/word/?page=${page}&limit=${limit}&word=${word}`
  );
  const { docs, totalDocs, totalPages, ...other } = result.data;
  return { docs, totalDocs, totalPages };
};
