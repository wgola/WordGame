import words from "../models/words.model";

const checkIfWordExists = async (word: string) =>
  (await words.findOne({ word: word })) !== null;

const getWordsPage = async (word: string, page: number, limit: number) =>
  await words.paginate(
    { word: { $regex: `^${word}` } },
    {
      page: page,
      limit: limit,
      sort: { word: 1 },
    }
  );

const getAllWords = async () => await words.find();

export { checkIfWordExists, getWordsPage, getAllWords };
