import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./state/UserSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
