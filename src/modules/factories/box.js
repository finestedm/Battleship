export class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.containedShip = null;
    }

    containedShip(ship) {
        this.containedShip = ship;
    }

}

export function findBoxObject(x, y) {
    
}