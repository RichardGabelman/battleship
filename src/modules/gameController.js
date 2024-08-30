import { Player } from "./player.js";
import { initialSetup, renderBoard } from "./domManager.js";
import { BOARD_SIZE } from "./gameboard.js";

export function startGame() {
  initialSetup();

  const playerOne = new Player();
  const playerTwo = new Player();

  const playerOneBoard = playerOne.gameboard;
  const playerTwoBoard = playerTwo.gameboard;

  // place ship process
  playerOneBoard.placeShip([0, 0], [0, 4]);
  playerOneBoard.placeShip([1, 1], [1, 4]);
  playerOneBoard.placeShip([2, 2], [2, 4]);
  playerOneBoard.placeShip([3, 3], [3, 5]);
  playerOneBoard.placeShip([4, 4], [4, 5]);

  playerTwoBoard.placeShip([0, 0], [0, 4]);
  playerTwoBoard.placeShip([1, 1], [1, 4]);
  playerTwoBoard.placeShip([2, 2], [2, 4]);
  playerTwoBoard.placeShip([3, 3], [3, 5]);
  playerTwoBoard.placeShip([4, 4], [4, 5]);

  renderBoard(playerOne, "user");
  renderBoard(playerTwo, "computer");

  // TODO: Setup enemy tile event listeners that allows
  // user to strike spots AND then will call enemy turn
  // to strike a random place on user's board
  // + render both. Check win after user's strike and
  // after enemy strike.
  const enemyTiles = document.querySelectorAll(".computer .tile");
  for (const tile of enemyTiles) {
    tile.addEventListener("click", () => {
      // if recieveAttack returns false, the attack didn't go through
      if (!playerTwoBoard.recieveAttack(getHumanChoice(tile))) {
        return;
      }
      renderBoard(playerTwo, "computer");
      if (playerTwoBoard.allSunk()) {
        console.log("User won");
      }

      // TODO: Have the computer randomly find a tile
      // on the human board to attack.
      // Maybe track which human tiles have been hit to
      // ensure no duplicate hits but first try 
      // just brute force randomization and checking

      let compChoice = getComputerChoice();
      let validHit = playerOneBoard.recieveAttack(compChoice);
      while (!validHit) {
        compChoice = getComputerChoice();
        validHit = playerOneBoard.recieveAttack(compChoice);
      }
      playerOneBoard.recieveAttack(compChoice);
      renderBoard(playerOne, "user");
    });
  }
}

function getHumanChoice(tile) {
  const yVal = tile.getAttribute("data-y");
  const xVal = tile.getAttribute("data-x");
  return [yVal, xVal];
}

function getComputerChoice() {
  const y = Math.round(Math.random() * BOARD_SIZE);
  const x = Math.round(Math.random() * BOARD_SIZE);
  return [y, x];
}
