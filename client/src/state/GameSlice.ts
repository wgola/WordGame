import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Player } from "../types";
import { guessedWord } from "../types/guessedWord";
import { Letter } from "../types/letter";

interface gameState {
  gameID: string;
  host: Player;
  opponent: Player;
  letters: Array<Letter>;
  guessedWords: Array<guessedWord>;
  generatingWords: boolean;
  currentTurn: string;
  infoLogs: Array<string>;
}

const initialState: gameState = {
  gameID: "",
  host: { userID: "", username: "", color: "", score: 0 },
  opponent: { userID: "", username: "", color: "", score: 0 },
  letters: [],
  guessedWords: [],
  generatingWords: true,
  currentTurn: "",
  infoLogs: [],
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
        action.payload.generatingWords !== undefined
          ? action.payload.generatingWords
          : initialState.generatingWords;
      state.currentTurn = action.payload.currentTurn
        ? action.payload.currentTurn
        : initialState.currentTurn;
      state.infoLogs = action.payload.infoLogs || initialState.infoLogs;
    },
    addOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    saveGeneratedGame: (state, action) => {
      state.letters = action.payload.letters;
      state.guessedWords = action.payload.guessedWords;
      state.generatingWords = action.payload.generatingWords;
    },
    saveCorrectWord: (state, action) => {
      const foundWord = state.guessedWords.find(
        (guessedWord) => guessedWord.id === action.payload.id
      );
      if (foundWord) {
        foundWord.word = action.payload.word;
        const player =
          state.host.userID === action.payload.player
            ? state.host
            : state.opponent;
        player.score += action.payload.points;
      }
    },
    changeTurn: (state, action) => {
      state.currentTurn = action.payload;
    },
    addNewLog: (state, action) => {
      state.infoLogs.push(action.payload);
    },
    clearGame: (state) => {
      state.gameID = initialState.gameID;
      state.generatingWords = initialState.generatingWords;
      state.guessedWords = initialState.guessedWords;
      state.host = initialState.host;
      state.letters = initialState.letters;
      state.opponent = initialState.opponent;
    },
  },
});

export const {
  saveGame,
  addOpponent,
  saveGeneratedGame,
  saveCorrectWord,
  changeTurn,
  addNewLog,
  clearGame,
} = gameSlice.actions;

export const gameDataReducer = gameSlice.reducer;

export const getGameData = (state: RootState) => state.gameData;

export const getPlayers = (state: RootState) => ({
  host: state.gameData.host,
  opponent: state.gameData.opponent,
});

export const getGameLoading = (state: RootState) =>
  state.gameData.generatingWords;

export const getGuessedWords = (state: RootState) =>
  state.gameData.guessedWords;

export const getLetters = (state: RootState) => state.gameData.letters;

export const isPlayerTurn = (state: RootState) =>
  state.gameData.currentTurn === state.userData.id;

export const getCurrentPlayer = (state: RootState) => {
  if (state.gameData.currentTurn === "") return null;
  else
    return state.gameData.currentTurn === state.gameData.host.userID
      ? state.gameData.host
      : state.gameData.opponent;
};

export const isHost = (state: RootState) =>
  state.gameData.host.userID === state.userData.id;

export const getInfoLogs = (state: RootState) => state.gameData.infoLogs;
