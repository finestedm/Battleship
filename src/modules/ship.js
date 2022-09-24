export var shipObjects = [];

export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitPositions = [];
        shipObjects.push(this);
    }

    hit(position) {
        this.hitPositions.push(position);
    }

    isSunk() {
        return this.hitPositions.length === this.length // if hitPosistion array contains amount of positions equal to length of the ship it means its sunk
    }

}

export function findShipObjectWithName(name) {
    return shipObjects.filter(ship => ship.name === name)[0]
}
