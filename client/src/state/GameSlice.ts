import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Player } from "../types";

interface guessedWord {
  id: number;
  word: string;
  length: number;
}

interface gameState {
  gameID: string;
  host: Player;
  opponent: Player;
  letters: Array<string>;
  guessedWords: Array<guessedWord>;
  generatingWords: boolean;
}

const initialState: gameState = {
  gameID: "",
  host: { userID: "", username: "", color: "", score: 0 },
  opponent: { userID: "", username: "", color: "", score: 0 },
  letters: [],
  guessedWords: [],
  generatingWords: true,
};

export const gameSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    saveGame: (state, action) => {
      state.gameID = action.payload.gameID;
      state.host = action.payload.host;
      state.opponent = action.payload.opponent || initialState.opponent;
      state.letters = action.payload.letters || initialState.letters;
      state.guessedWords =
        action.payload.guessedWords || initialState.guessedWords;
      state.generatingWords =
        action.payload.generatingWords || initialState.generatingWords;
    },
    addOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    saveGeneratedGame: (state, action) => {
      state.letters = action.payload.letters;
      state.guessedWords = action.payload.guessedWords;
      state.generatingWords = action.payload.generatingWords;
    },
    clearGame: (state) => {
      state = initialState;
    },
  },
});

export const { saveGame, addOpponent, saveGeneratedGame, clearGame } =
  gameSlice.actions;

export const gameDataReducer = gameSlice.reducer;

export const getGameData = (state: RootState) => state.gameData;

export const getPlayers = (state: RootState) => ({
  host: state.gameData.host,
  opponent: state.gameData.opponent,
});

export const getGameLoading = (state: RootState) =>
  state.gameData.generatingWords;
