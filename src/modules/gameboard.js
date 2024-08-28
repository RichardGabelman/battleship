import { Ship } from "./ship.js";

export const BOARD_SIZE = 10;
export const SHIP_EMOJI = "🚢";
export const EMPTY_SPACE_EMOJI = "🌊";
export const DAMAGED_SHIP_EMOJI = "💥";
export const MISS_EMOJI = "💦";

export class Gameboard {
  // Tile options:
  // 🌊 open water
  // Ship object becomes 🚢
  // 💥 damaged ship section
  #board;
  constructor() {
    let arr = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      arr[i] = new Array(BOARD_SIZE);
      for (let n = 0; n < BOARD_SIZE; n++) {
        arr[i][n] = EMPTY_SPACE_EMOJI;
      }
    }
    this.#board = arr;
  }

  get board() {
    let copy = new Array(BOARD_SIZE);
    for (let i = 0; i < BOARD_SIZE; i++) {
      copy[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (typeof this.#board[i][j] === "object") {
          copy[i][j] = SHIP_EMOJI;
        } else {
          copy[i][j] = this.#board[i][j];
        }
      }
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
    if (
      y1 >= BOARD_SIZE ||
      y2 >= BOARD_SIZE ||
      x1 >= BOARD_SIZE ||
      x2 >= BOARD_SIZE
    ) {
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
        if (this.#board[i][j] !== EMPTY_SPACE_EMOJI) {
          this.#board = backupBoard;
          return false;
        }
        this.#board[i][j] = ship;
      }
    }
    return true;
  }

  // returns true if the attack went through
  recieveAttack(coord) {
    const [y, x] = coord;

    // no hits off the board
    if (y < 0 || x < 0) {
      return false;
    }
    if (y >= BOARD_SIZE || x >= BOARD_SIZE) {
      return false;
    }

    let tile = this.#board[y][x];

    // no hits on places already hit
    if (tile === DAMAGED_SHIP_EMOJI || tile === MISS_EMOJI) {
      return false;
    }

    if (typeof tile === "object") {
      tile.hit();
      this.#board[y][x] = DAMAGED_SHIP_EMOJI;
    } else {
      this.#board[y][x] = MISS_EMOJI;
    }
    return true;
  }
}
