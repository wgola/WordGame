import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userType } from "../types";

interface userState {
  id?: string;
  email?: string;
  username?: string;
  color?: string;
}

const initialState: userState = {};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<userType>) =>
      (state = action.payload),
    deleteUserData: (state) => (state = {}),
  },
});

export const { saveUserData, deleteUserData } = userSlice.actions;

export const userDataReducer = userSlice.reducer;

export const getUser = (state: RootState) => state.userData;
