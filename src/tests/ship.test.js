import { Ship } from "../modules/ship.js";

describe("hits()", () => {
  test("correctly increment ship hits variable", () => {
    const testShip = new Ship(4);
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });
});

describe("isSunk()", () => {
  test("new ships aren't sunk", () => {
    const testShip = new Ship(4);
    expect(testShip.isSunk()).toBe(false);
  });
  test("ships of size 4 are sunk after 4 hits", () => {
    const testShip = new Ship(4);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
  test("ships that have been hit but not enough aren't sunk", () => {
    const testShip = new Ship(4);
    testShip.hit();
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });
});
