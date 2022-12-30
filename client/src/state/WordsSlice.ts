import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { getWords } from "../api";
import { wordType } from "../types";

interface wordsState {
  words: { [index: string]: wordType };
  pages: { [index: number]: Array<string> };
  isFetching: boolean;
  wordsCount: number;
}

const initialState: wordsState = {
  words: {},
  pages: {},
  isFetching: false,
  wordsCount: 0,
};

export const wordsSlice = createSlice({
  name: "wordsList",
  initialState,
  reducers: {
    addNewPage: (state, action) => {
      action.payload.words.map((word: wordType) => {
        state.words[word._id] = word;
        if (state.pages[action.payload.page] === undefined) {
          state.pages[action.payload.page] = [];
        }
        state.pages[action.payload.page].push(word._id);
      });
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
    setWordsCount: (state, action) => {
      if (state.wordsCount !== action.payload)
        state.wordsCount = action.payload;
    },
    clearData: (state) => {
      state.words = {};
      state.pages = {};
      state.isFetching = false;
      state.wordsCount = 0;
    },
  },
});

export const { addNewPage, setWordsCount, setIsFetching, clearData } =
  wordsSlice.actions;

export const wordsListReducer = wordsSlice.reducer;

export const getWordsFromPage = (page: number) => (state: RootState) => {
  const ids = state.wordsList.pages[page];
  const allWords = state.wordsList.words;
  const filteredWords = ids ? ids.map((id) => allWords[id]) : [];
  return filteredWords;
};

export const getWordsCount = (state: RootState) => state.wordsList.wordsCount;

export const getIsFetching = (state: RootState) => state.wordsList.isFetching;

export const fetchNewPage =
  (word: string, page: number, limit: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(setIsFetching(true));
    const result = await getWords(word, page, limit);
    dispatch(setWordsCount(result.totalDocs));
    dispatch(addNewPage({ words: result.docs, page: page }));
    dispatch(setIsFetching(false));
  };
