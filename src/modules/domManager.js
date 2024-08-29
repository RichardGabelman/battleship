import { BOARD_SIZE } from "./gameboard.js";

export function initialSetup() {
  const gameboards = document.querySelectorAll(".gameboard");
  for (const board of gameboards) {
    console.log(board);
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
      }
    }
  }
}