import { Ship } from "./ship.js";

export const BOARD_SIZE = 10;

export class Gameboard {
  #board;
  constructor() {
    let arr = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      arr[i] = new Array(BOARD_SIZE);
      for (let n = 0; n < BOARD_SIZE; n++) {
        arr[i][n] = "🌊";
      }
    }
    this.#board = arr;
  }

  get board() {
    let copy = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      copy[i] = [...this.#board[i]];
    }
    return copy;
  }

  // returns true if ship was successfully placed
  // coords are inclusive
  // ex. [0, 0] && [0, 2]
  // [[🚢, 🚢, 🚢, ...]]
  placeShip(coordOne, coordTwo) {
    const [y1, x1] = coordOne;
    const [y2, x2] = coordTwo;

    // no placing ships outside of the board
    if (y1 < 0 || y2 < 0 || x1 < 0 || x2 < 0) {
      return false;
    }
    if (y1 >= BOARD_SIZE || y2 >= BOARD_SIZE || x1 >= BOARD_SIZE || x2 >= BOARD_SIZE) {
      return false;
    }

    // no placing ships diagonally
    if (y1 != y2 && x1 != x2) {
      return false;
    }

    const minY = Math.min(y1, y2);
    const minX = Math.min(x1, x2);
    const maxY = Math.max(y1, y2);
    const maxX = Math.max(x1, x2);

    const backupBoard = this.board;

    const length = 1 + Math.max(maxX - minX, maxY - maxY);
    const ship = new Ship(length);

    for (let i = minY; i <= maxY; i++) {
      for (let j = minX; j <= maxX; j++) {
        if (this.#board[i][j] !== "🌊") {
          this.#board = backupBoard;
          return false;
        }
        this.#board[i][j] = ship;
      }
    }
    return true;
  }
}