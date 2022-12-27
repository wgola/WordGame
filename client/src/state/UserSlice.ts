import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    saveUserData: (state, action) => action.payload,
    deleteUserData: (state) => {},
  },
});

export const { saveUserData, deleteUserData } = userData.actions;

export const userDataReducer = userData.reducer;
