import { Gameboard, BOARD_SIZE, SHIP_EMOJI, EMPTY_SPACE_EMOJI, DAMAGED_SHIP_EMOJI, MISS_EMOJI } from "../modules/gameboard.js";

describe("get board()", () => {
  test("new Gameboard contains 'empty' board", () => {
    const testBoard = new Gameboard();
    expect(testBoard.board).toEqual([
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"]
    ]);
  });
  test("mutations to gotten board don't affect actual board", () => {
    const testBoard = new Gameboard();
    let copyOfBoard = testBoard.board;
    copyOfBoard[0][0] = "⛵";
    expect(testBoard.board[0][0]).toEqual("🌊");
  });
});

describe("placeShip()", () => {
  test("placed ship is correctly represented on the board", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0,0], [0,4]);
    expect(testBoard.board).toEqual([
      ["🚢", "🚢", "🚢", "🚢", "🚢", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"],
      ["🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊", "🌊"]
    ]);
  });
  test("ships cannot be placed if any of the ship would be outside the gameboard", () => {
    const testBoard = new Gameboard();
    expect(testBoard.placeShip([-1, 0], [0, 0])).toEqual(false);
    expect(testBoard.placeShip([0, -1], [0, 0])).toEqual(false);
    expect(testBoard.placeShip([BOARD_SIZE, 0], [BOARD_SIZE, 4])).toEqual(false);
    expect(testBoard.placeShip([0, BOARD_SIZE], [4, BOARD_SIZE])).toEqual(false);
  });
  test("ships cannot be placed diagonally", () => {
    const testBoard = new Gameboard();
    expect(testBoard.placeShip([0, 0], [1, 1])).toEqual(false);
  });
  test("ships cannot be placed on squares already containing a ship", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0, 2], [0, 3]);
    expect(testBoard.placeShip([0, 0], [0, 4])).toEqual(false);
  });
  test("ship coords can be given in any order", () => {
    const boardOne = new Gameboard();
    const boardTwo = new Gameboard();

    boardOne.placeShip([0, 0], [0, 2]);
    boardTwo.placeShip([0, 2], [0, 0]);

    boardOne.placeShip([0, 0], [2, 0]);
    boardTwo.placeShip([2, 0], [0, 0]);
    expect(boardOne.board).toEqual(boardTwo.board);
  });
});

describe("recieveAttack()", () => {
  test("on-target attack is rendered", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0,0], [0,1]);
    testBoard.recieveAttack([0, 0]);
    expect(testBoard.board[0][0]).toBe(DAMAGED_SHIP_EMOJI);
  });
  test("missed attack is rendered", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0,0], [0,1]);
    testBoard.recieveAttack([0, 5]);
    expect(testBoard.board[0][5]).toBe(MISS_EMOJI);
  });
  test("hits off the board aren't allowed", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0,0], [0,1]);
    testBoard.recieveAttack([-1, 5]);
    expect(testBoard.recieveAttack([-1, 5])).toBe(false);
    expect(testBoard.recieveAttack([0, -1])).toBe(false);
    expect(testBoard.recieveAttack([BOARD_SIZE, 5])).toBe(false);
    expect(testBoard.recieveAttack([5, BOARD_SIZE])).toBe(false);
  });
  test("attacks on previously attacked places aren't allowed", () => {
    const testBoard = new Gameboard();
    testBoard.placeShip([0,0], [0,1]);
    testBoard.recieveAttack([0, 0]);
    testBoard.recieveAttack([0, 5]);
    expect(testBoard.recieveAttack([0, 0])).toBe(false);
    expect(testBoard.recieveAttack([0, 5])).toBe(false);
  });
});
