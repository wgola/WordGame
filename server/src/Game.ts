import { generateLetters } from "./utils/generateLetters";
import { getAllWords } from "./services/words.service";
import { checkLetters } from "./utils/checkLetters";
import log from "./configs/logs.config";
import { Player } from "./types/Player";
import { Word } from "./types/Word";
import { io } from "./app";

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

    this.generateGame();
  }

  onWordCheck = (payload: string) => {
    const word = payload;

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

    this.publish("wordChecked", JSON.stringify(response));

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
      this.publish("endGame", "15");
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

    this.publish("generatedGame", message);
  };

  private publish = (topic: string, message: string) => {
    io.to(this.gameID).emit(topic, message);
  };

  private sendInfo = (message: string) => {
    log.info(`Game ${this.gameID}: ${message}`);
    this.infoLogs.push(message);
    this.publish("info", message);
  };

  private changeTurn = (type?: "first" | "last") => {
    if (type === "last") {
      this.currentTurn = "";
      this.publish("changeTurn", this.currentTurn);
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

      this.publish("changeTurn", this.currentTurn);

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
