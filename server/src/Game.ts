import { MqttClient } from "mqtt";
import { getAllWords } from "./services/words.service";
import { Player } from "./types/Player";
import { Word } from "./types/Word";
import { checkLetters } from "./utils/checkLetters";
import { generateLetters } from "./utils/generateLetters";

class Game {
  gameID: string;
  host: Player;
  opponent: Player;
  letters: Array<string>;
  words: Array<string>;
  guessedWords: Array<string>;
  generatingWords: boolean = true;
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
    const allWords = await getAllWords();

    let letters: Array<string>;
    let filteredWords: Array<Word>;
    do {
      letters = generateLetters(10);
      filteredWords = allWords.filter((word) =>
        checkLetters(word.word, letters)
      );
    } while (filteredWords.length < 10);

    this.letters = letters;
    this.words = [];

    for (let i = 0; i < 10; i++) {
      this.words.push(
        filteredWords[Math.floor(Math.random() * filteredWords.length)].word
      );
    }

    this.generatingWords = false;
    this.mqttClient.publish(`game/${this.gameID}/generatedWords`, "true");
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
