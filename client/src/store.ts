import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./state/UserSlice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
  },
});
