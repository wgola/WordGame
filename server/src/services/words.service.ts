import words from "../models/words.model";

const checkIfWordExists = async (word: string) =>
  (await words.findOne({ word: word })) !== null;

const getWordsPage = async (page: number, limit: number) =>
  await words.paginate({}, { page: page, limit: limit });

export { checkIfWordExists, getWordsPage };
