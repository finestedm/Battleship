import shipObjects from './gameboard'

export class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitPositions = 0;
        this.color = null;
        this.chooseShipColor()
    }

    hit() {
        this.hitPositions++;
    }

    isSunk() {
        return this.hitPositions === this.length // if hitPosition array contains amount of positions equal to length of the ship it means its sunk
    }

    chooseShipColor() {
        switch (this.length) {
            case 4:
                this.color = 'purple'
                break;
            case 3:
                this.color = 'orange'
                break;
            case 2:
                this.color = 'yellow'
                break;
            default:
                this.color = 'black'
                break;
        }
    }

}



