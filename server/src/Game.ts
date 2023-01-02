import { Player } from "./types/Player";

class Game {
  gameID: string;
  host: Player;
  opponent: Player;

  constructor(gameID: string, host: Player) {
    this.gameID = gameID;
    this.host = host;
  }

  setOpponent = (opponent: Player) => {
    this.opponent = opponent;
  };

  toJson = () => {
    return { gameID: this.gameID, host: this.host, opponent: this.opponent };
  };
}

export default Game;
