import { Socket } from "socket.io";
import { io } from "../src/index";
import log from "./configs/logs.config";
import { getAllWords } from "./services/words.service";
import { Player } from "./types/Player";
import { Word } from "./types/Word";
import { checkLetters } from "./utils/checkLetters";
import { generateLetters } from "./utils/generateLetters";

interface wordAnswer {
  id: number;
  word: string;
  points: number;
}

interface guessedWord {
  id: number;
  word: string;
  length: number;
}

interface Letter {
  id: number;
  letter: string;
}

class Game {
  gameID: string;
  host: Player;
  opponent: Player;

  letters: Array<Letter>;
  wordsAnswers: Array<wordAnswer>;
  guessedWords: Array<guessedWord>;
  howManyGuessed: number = 0;

  currentTurn: string;
  generatingWords: boolean = false;
  infoLogs: Array<string> = [];

  constructor(gameID: string, host: Player) {
    this.gameID = gameID;
    this.host = host;

    io.on("connection", (socket: Socket) => {
      log.info(`${socket.id} connected`);

      socket.join(this.gameID);

      socket.on("checkWord", (word: string) => this.onWordCheck(word));

      socket.on("disconnect", () => log.info(`${socket.id} disconnected`));
    });

    this.generateGame();
  }

  private onWordCheck = (word: string) => {
    const foundWord = this.wordsAnswers.find(
      (wordAnswer) => wordAnswer.word === word
    );

    const ifAlreadyGuessed =
      this.guessedWords.find((guessedWord) => guessedWord.word === word) !==
      undefined;

    const guessedWord = this.guessedWords.find(
      (guessedWord) => guessedWord.id === foundWord?.id
    );

    if (guessedWord) guessedWord.word = word;

    if (foundWord !== undefined && !ifAlreadyGuessed) this.howManyGuessed += 1;

    const response = {
      correct: foundWord !== undefined && !ifAlreadyGuessed,
      player: this.currentTurn,
      ...foundWord,
    };

    const player =
      this.host.userID === this.currentTurn ? this.host : this.opponent;

    player.score += foundWord?.points || 0;

    io.to(`${this.gameID}`).emit("wordChecked", JSON.stringify(response));

    const info = response.correct
      ? `${player.username} scored ${foundWord.points} points!`
      : `${player.username} didn't guess the word!`;

    this.sendInfo(info);

    if (this.howManyGuessed === 10) {
      this.changeTurn("last");
      const winner = this.getWinner();

      if (winner) this.sendInfo(`${winner.username} has won!`);
      else this.sendInfo("Game ended with a draw!");

      this.infoLogs.push("This game will be deleted in 15 seconds...");
      io.to(`${this.gameID}`).emit("endGame", "15");
    } else {
      this.changeTurn();
    }
  };

  setOpponent = (opponent: Player) => {
    if (
      this.opponent?.userID === opponent.userID ||
      this.host.userID === opponent.userID
    )
      return true;

    if (this.opponent !== undefined) return false;

    this.opponent = opponent;

    this.sendInfo(`Player ${opponent.username} joined game!`);

    this.changeTurn("first");
    return true;
  };

  private getWinner = () => {
    if (this.host.score > this.opponent.score) return this.host;
    else if (this.host.score === this.opponent.score) return undefined;
    else return this.opponent;
  };

  private generateGame = async () => {
    this.generatingWords = true;

    const allWords = await getAllWords();

    let letters: Array<string>;
    let filteredWords: Array<Word>;

    do {
      letters = generateLetters(10);
      filteredWords = allWords.filter((word) =>
        checkLetters(word.word, letters)
      );
    } while (filteredWords.length < 10);

    this.letters = letters.map((letter, index) => ({
      id: index,
      letter: letter,
    }));
    this.wordsAnswers = [];
    this.guessedWords = [];

    while (this.wordsAnswers.length < 10) {
      const chosenWord =
        filteredWords[Math.floor(Math.random() * filteredWords.length)].word;

      if (this.wordsAnswers.findIndex((elem) => elem.word === chosenWord) < 0) {
        const id = this.wordsAnswers.length;

        this.wordsAnswers.push({
          id: id,
          word: chosenWord,
          points: chosenWord.length,
        });
        this.guessedWords.push({ id: id, word: "", length: chosenWord.length });
      }
    }

    this.generatingWords = false;

    this.sendInfo("Finished generating game.");

    log.info(
      `Game ${this.gameID} answers: ${JSON.stringify(
        this.wordsAnswers.map((wordAnswer) => wordAnswer.word)
      )}`
    );

    const message = JSON.stringify({
      letters: this.letters,
      guessedWords: this.guessedWords,
      generatingWords: this.generatingWords,
    });

    io.to(`${this.gameID}`).emit("generatedGame", message);
  };

  private sendInfo = (message: string) => {
    log.info(`Game ${this.gameID}: ${message}`);
    this.infoLogs.push(message);
    io.to(`${this.gameID}`).emit("info", message);
  };

  private changeTurn = (type?: "first" | "last") => {
    if (type === "last") {
      this.currentTurn = "";
      io.to(`${this.gameID}`).emit("changeTurn", this.currentTurn);
    } else {
      if (type === "first") {
        this.currentTurn = Math.round(Math.random())
          ? this.host.userID
          : this.opponent.userID;
      } else {
        this.currentTurn =
          this.currentTurn === this.host.userID
            ? this.opponent.userID
            : this.host.userID;
      }

      const player =
        this.host.userID === this.currentTurn ? this.host : this.opponent;

      io.to(`${this.gameID}`).emit("changeTurn", this.currentTurn);

      this.sendInfo(`It's ${player.username} turn now!`);
    }
  };

  toJson = () => {
    return {
      gameID: this.gameID,
      host: this.host,
      opponent: this.opponent,
      letters: this.letters,
      guessedWords: this.guessedWords,
      generatingWords: this.generatingWords,
      currentTurn: this.currentTurn,
      infoLogs: this.infoLogs,
    };
  };
}

export default Game;
