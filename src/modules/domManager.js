import { BOARD_SIZE, SHIP_EMOJI, EMPTY_SPACE_EMOJI } from "./gameboard.js";

export function initialSetup() {
  const gameboards = document.querySelectorAll(".gameboard");
  for (const board of gameboards) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
      }
    }
  }
}

export function renderBoard(player, type) {
  const board = player.gameboard.board;
  const domBoard = document.querySelector(`.${type}`);
  domBoard.textContent = "";
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("data-y", i);
      tile.setAttribute("data-x", j);
      let emoji = board[i][j];
      if (type === "computer") {
        if (board[i][j] === SHIP_EMOJI) {
          emoji = EMPTY_SPACE_EMOJI;
        }
      }
      tile.textContent = emoji;
      domBoard.appendChild(tile);
    }
  }
}

export function displayWinner(winner) {
  const mainContent = document.querySelector(".boards");
  mainContent.remove();
  const heading = document.querySelector("h1");
  heading.textContent = `${winner} won!`;
}
