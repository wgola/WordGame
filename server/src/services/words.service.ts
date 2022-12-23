import words from "../models/words.model";

const checkIfWordExists = async (word: string) =>
  (await words.findOne({ word: word })) !== null;

export { checkIfWordExists };
