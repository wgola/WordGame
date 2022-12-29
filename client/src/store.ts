import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./state/UserSlice";
import { wordsListReducer } from "./state/WordsSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    wordsList: wordsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
