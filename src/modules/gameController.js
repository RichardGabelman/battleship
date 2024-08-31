import { Player } from "./player.js";
import { initialSetup, renderBoard, displayWinner } from "./domManager.js";
import { BOARD_SIZE } from "./gameboard.js";

const playerOne = new Player();
const playerTwo = new Player();

export function startGame() {
  initialSetup();
  boardSetup();
}

function boardSetup() {
  playerOne.gameboard.generateRandomSetup();
  renderBoard(playerOne, "user");

  playerTwo.gameboard.generateRandomSetup();
  renderBoard(playerTwo, "computer");

  const randomBtn = document.querySelector("#randomize");
  randomBtn.addEventListener("click", () => {
    playerOne.gameboard.generateRandomSetup();
    renderBoard(playerOne, "user");
  });

  const startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", () => {
    randomBtn.remove();
    startBtn.remove();
    playGame();
  });
}

function playGame() {
  const enemyBoard = document.querySelector(".computer");
  enemyBoard.addEventListener("click", (e) => {
    const tile = e.target;
    // if recieveAttack returns false, the attack didn't go through
    if (!playerTwo.gameboard.recieveAttack(getHumanChoice(tile))) {
      return;
    }
    renderBoard(playerTwo, "computer");
    if (playerTwo.gameboard.allSunk()) {
      displayWinner("User");
      return;
    }

    let validHit = playerOne.gameboard.recieveAttack(getComputerChoice());
    while (!validHit) {
      validHit = playerOne.gameboard.recieveAttack(getComputerChoice());
    }
    renderBoard(playerOne, "user");
    if (playerOne.gameboard.allSunk()) {
      displayWinner("Computer");
      return;
    }
  });
}

function getHumanChoice(tile) {
  const yVal = tile.getAttribute("data-y");
  const xVal = tile.getAttribute("data-x");
  return [yVal, xVal];
}

function getComputerChoice() {
  const y = Math.round(Math.random() * (BOARD_SIZE - 1));
  const x = Math.round(Math.random() * (BOARD_SIZE - 1));
  return [y, x];
}
