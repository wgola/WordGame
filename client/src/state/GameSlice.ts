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
  host: { userID: "", username: "", color: "", score: 0 },
  opponent: { userID: "", username: "", color: "", score: 0 },
};

export const gameSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    saveGame: (state, action) => {
      state.gameID = action.payload.gameID;
      state.host = action.payload.host;
      state.opponent = action.payload.opponent || initialState.opponent;
    },
    addOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    clearGame: (state) => {
      state = initialState;
    },
  },
});

export const { saveGame, addOpponent, clearGame } = gameSlice.actions;

export const gameDataReducer = gameSlice.reducer;

export const getGameData = (state: RootState) => state.gameData;

export const getPlayers = (state: RootState) => ({
  host: state.gameData.host,
  opponent: state.gameData.opponent,
});
