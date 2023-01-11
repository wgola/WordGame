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
  letters: Array<Letter>;
  wordsAnswers: Array<wordAnswer>;
  guessedWords: Array<guessedWord>;
  generatingWords: boolean = false;
  mqttClient: MqttClient;

  constructor(gameID: string, host: Player, mqttClient: MqttClient) {
    this.gameID = gameID;
    this.host = host;
    this.mqttClient = mqttClient;

    this.generateWords();
  }

  setOpponent = (opponent: Player) => {
    if (this.opponent !== undefined) return false;

    if (this.opponent?.userID === opponent.userID) return true;

    this.opponent = opponent;
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

    for (let i = 0; i < 10; i++) {
      const chosenWord =
        filteredWords[Math.floor(Math.random() * filteredWords.length)].word;
      this.wordsAnswers.push({
        id: i,
        word: chosenWord,
        points: chosenWord.length,
      });
      this.guessedWords.push({ id: i, word: "", length: chosenWord.length });
    }

    this.generatingWords = false;
    this.mqttClient.publish(
      `game/${this.gameID}/generatedGame`,
      JSON.stringify({
        letters: this.letters,
        guessedWords: this.guessedWords,
        generatingWords: this.generatingWords,
      })
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
    };
  };
}

export default Game;
