export class Ship {
  #numHits;
  constructor(length) {
    this.length = length;
    this.#numHits = 0;
  }

  get hits() {
    return this.#numHits;
  }

  hit() {
    this.#numHits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
