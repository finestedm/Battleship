import shipObjects from './gameboard'

export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitPositions = 0;
    }

    hit() {
        this.hitPositions ++;
    }

    isSunk() {
        return this.hitPositions === this.length // if hitPosition array contains amount of positions equal to length of the ship it means its sunk
    }

}

