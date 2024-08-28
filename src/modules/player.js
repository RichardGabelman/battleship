import { Gameboard } from "./gameboard.js";

export class Player {
  constructor(type) {
    // Human or Computer
    this.type = type;
    this.gameboard = new Gameboard();
  }
}