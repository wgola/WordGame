import { createSlice } from "@reduxjs/toolkit";

interface gameState {
  test: string;
}

const initialState: gameState = { test: "" };

export const gameSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    test: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const { test } = gameSlice.actions;

export const gameDataReducer = gameSlice.reducer;
