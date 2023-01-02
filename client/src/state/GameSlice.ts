import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Player } from "../types";

interface gameState {
  gameID: string;
  host: Player;
  opponent: Player;
}

const initialState: gameState = {
  gameID: "",
  host: { userID: "", username: "", color: "" },
  opponent: { userID: "", username: "", color: "" },
};

export const gameSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    saveGame: (state, action) => {
      state.gameID = action.payload.gameID;
      state.host = action.payload.host;
    },
  },
});

export const { saveGame } = gameSlice.actions;

export const gameDataReducer = gameSlice.reducer;

export const getGameData = (state: RootState) => state.gameData;
