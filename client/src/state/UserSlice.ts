import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "userData",
  initialState: {
    user: {},
  },
  reducers: {
    saveUserData: (state, newUserData) => {
      state.user = newUserData;
    },
    deleteUserData: (state) => {
      state.user = {};
    },
  },
});

export const { saveUserData, deleteUserData } = userData.actions;

export const userDataReducer = userData.reducer;
