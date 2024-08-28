const BOARD_SIZE = 10;

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
}