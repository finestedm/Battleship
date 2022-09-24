import { Ship } from './ship.js';


const boardSize = 10;


export class Gameboard {

    constructor() {
        this.board = [];
        this.takenLocations = [];
        this.init();
        this.totalLengthOfShips = 0;
    }

    init() {
        for (let x = 0; x < boardSize; x++) {
            this.board[x] = []
            for (let y = 0; y < boardSize; y++) {
                this.board[x][y] = null
            }
        }
    }

    placeShip(ship, startLocation, direction) {
        this.totalLengthOfShips += this.length
        if (startLocation[direction] + ship.length > boardSize) {
            return "cannot place ship here" // later change this to function so that it changes all left boxes class to show 'X'
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[(startLocation.x) + (i * (direction === 'x'))][startLocation.y + (i * (direction === 'y'))] = ship.name // change value of the taken location to ship name along x or y axis 
            }
        }
    }

    receiveAttack(coordinates) {
        var coordinatesOfAttack = this.board[coordinates['x']][coordinates['y']]
        if (coordinatesOfAttack === null) {
            coordinatesOfAttack = 'missed'
            return coordinatesOfAttack
        } else {
            
            return `ship ${coordinatesOfAttack} was hit`
        }
    }

}
