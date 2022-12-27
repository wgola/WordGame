import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface userState {
  _id?: string;
  email?: string;
  username?: string;
  password?: string;
  color?: string;
}

const initialState: userState = {};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    saveUserData: (state, action: PayloadAction<userState>) =>
      (state = action.payload),
    deleteUserData: (state) => (state = {}),
  },
});

export const { saveUserData, deleteUserData } = userSlice.actions;

export const userDataReducer = userSlice.reducer;

export const getUser = (state: RootState) => state.userData;
