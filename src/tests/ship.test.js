import { Ship } from "../modules/ship.js";

describe("hits()", () => {
  test("correctly increment ship hits variable", () => {
    const testShip = new Ship(4);
    testShip.hit();
    expect(testShip.hits).toBe(1);
  });
});