export class Ship {
  constructor(length) {
    this.length = length;
    this.numHits = 0;
  }

  get hits() {
    return this.numHits;
  }

  set hits(num) {
    this.numHits = num;
  }

  hit() {
    this.numHits++;
  }
}