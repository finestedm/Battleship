export class Box {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isHit = false;
        this.containedShip = null;
    }

    containedShip(ship) {
        this.containedShip = ship;
    }

}