import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    saveUserData: (state, action) => (state = action.payload),
    deleteUserData: (state) => (state = {}),
  },
});

export const { saveUserData, deleteUserData } = userData.actions;

export const userDataReducer = userData.reducer;
