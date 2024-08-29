import { Player } from "./player.js";
import { initialSetup } from "./domManager.js";

export function startGame() {
  initialSetup();

  const playerOne = new Player();
  const playerTwo = new Player();
  
  playerOne.placeShip([0, 0], [0, 4]);
  playerOne.placeShip([1, 1], [1, 4]);
  playerOne.placeShip([2, 2], [2, 4]);
  playerOne.placeShip([3, 3], [3, 5]);
  playerOne.placeShip([4, 4], [4, 5]);
  
  playerTwo.placeShip([0, 0], [0, 4]);
  playerTwo.placeShip([1, 1], [1, 4]);
  playerTwo.placeShip([2, 2], [2, 4]);
  playerTwo.placeShip([3, 3], [3, 5]);
  playerTwo.placeShip([4, 4], [4, 5]);
}

