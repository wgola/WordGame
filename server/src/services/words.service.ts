import words from "../models/words.model";

const checkIfWordExists = async (word: string) => {
  const foundWord = await words.findOne({ word: word });
  return foundWord !== null;
};

export { checkIfWordExists };
