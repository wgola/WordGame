import { MqttClient } from "mqtt";
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
  currentTurn: string;
  letters: Array<Letter>;
  wordsAnswers: Array<wordAnswer>;
  guessedWords: Array<guessedWord>;
  generatingWords: boolean = false;
  mqttClient: MqttClient;

  constructor(gameID: string, host: Player, mqttClient: MqttClient) {
    this.gameID = gameID;
    this.host = host;
    this.mqttClient = mqttClient;

    this.mqttClient.subscribe(`/game/${this.gameID}/checkWord`);
    this.mqttClient.on("message", this.onWordCheck);
    this.generateWords();
  }

  private onWordCheck = (topic: string, payload: Buffer) => {
    if (topic === `/game/${this.gameID}/checkWord`) {
      const word = payload.toString();

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

      const response = {
        correct: foundWord !== undefined && !ifAlreadyGuessed,
        player: this.currentTurn,
        ...foundWord,
      };

      const player =
        this.host.userID === this.currentTurn ? this.host : this.opponent;

      player.score += foundWord?.points || 0;

      this.currentTurn =
        this.currentTurn === this.host.userID
          ? this.opponent.userID
          : this.host.userID;

      this.mqttClient.publish(
        `/game/${this.gameID}/wordChecked`,
        JSON.stringify(response)
      );

      const info = response.correct
        ? `${player.username} scored ${foundWord.points} points!`
        : `${player.username} didn't guess the word!`;

      this.mqttClient.publish(`/game/${this.gameID}/info`, info);

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
    this.currentTurn = Math.round(Math.random())
      ? this.host.userID
      : this.opponent.userID;

    this.mqttClient.publish(
      `/game/${this.gameID}/info`,
      `Player ${opponent.username} joined game!`
    );

    this.changeTurn();
    return true;
  };

  private generateWords = async () => {
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

    this.letters = letters.map((elem, index) => ({ id: index, letter: elem }));
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

    console.log(this.wordsAnswers);

    this.generatingWords = false;

    this.mqttClient.publish(
      `/game/${this.gameID}/info`,
      "Finished generating game."
    );

    this.mqttClient.publish(
      `game/${this.gameID}/generatedGame`,
      JSON.stringify({
        letters: this.letters,
        guessedWords: this.guessedWords,
        generatingWords: this.generatingWords,
      })
    );
  };

  private changeTurn = () => {
    const player =
      this.host.userID === this.currentTurn ? this.host : this.opponent;

    this.mqttClient.publish(
      `/game/${this.gameID}/changeTurn`,
      this.currentTurn
    );

    this.mqttClient.publish(
      `/game/${this.gameID}/info`,
      `It's ${player.username} turn now!`
    );
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
    };
  };
}

export default Game;
