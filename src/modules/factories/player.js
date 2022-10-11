import { boardSize, Gameboard } from "./gameboard";

export var players = []

export class Player {
    constructor(name, isPC) {
        this.name = name;
        this.isPC = isPC;
        this.gameboard = new Gameboard();
        this.init()
        players.push(this)
    }

    init() {
        this.gameboard.createNewShip(`Destroyer`, 2)
        this.gameboard.createNewShip(`Submarine`, 3)
        this.gameboard.createNewShip(`Cruiser`, 3)
        this.gameboard.createNewShip(`Battleship`, 4)
        this.gameboard.createNewShip(`Carrier`, 5)
    }

    attack() {
        return [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]
    }
}

