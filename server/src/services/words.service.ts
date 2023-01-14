import words from "../models/words.model";
import log from "../configs/logs.config";

const getWordsPage = async (word: string, page: number, limit: number) => {
  log.info("Returned words page");
  return await words.paginate(
    { word: { $regex: `^${word}` } },
    {
      page: page,
      limit: limit,
      sort: { word: 1 },
    }
  );
};

const getAllWords = async () => {
  log.info("Returned all words");
  return await words.find();
};

export { getWordsPage, getAllWords };
