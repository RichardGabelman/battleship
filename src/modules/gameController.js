import { Player } from "./player.js";
import { initialSetup, renderBoard } from "./domManager.js";

export function startGame() {
  initialSetup();

  const playerOne = new Player();
  const playerTwo = new Player();

  const playerOneBoard = playerOne.gameboard;
  const playerTwoBoard = playerTwo.gameboard;
  
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
}

