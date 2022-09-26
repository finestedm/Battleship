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
        for (let i = 2; i <= 5; i++) {
            this.gameboard.createNewShip(`Ship${i - 1}`, i);
        }
    }

    attack() {
        return [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)]
    }
}

