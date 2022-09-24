import { Ship } from './ship.js';


const boardSize = 10;


function checkIfAnyBoxTaken(ship, board, startLocation, direction) {
    for (let i = 0; i < ship.length; i++) {
        if (board[(startLocation.x) + (i * (direction === 'x'))][startLocation.y + (i * (direction === 'y'))] !== null)
            return true
    }
}

export function findShipObjectWithName(shipObjects, name) {
    return shipObjects.filter(ship => ship.name === name)[0]
}

export class Gameboard {

    constructor() {
        this.board = [];
        this.takenLocations = [];
        this.init();
        this.totalLengthOfShips = 0;
        this.shipObjects = [];
        this.hitLocations = []
        this.missedLocations = []

    }

    init() {
        for (let x = 0; x < boardSize; x++) {
            this.board[x] = []
            for (let y = 0; y < boardSize; y++) {
                this.board[x][y] = null
            }
        }
    }

    createNewShip(name, length) {
        const newShip = new Ship(name, length)
        this.shipObjects.push(newShip)
        return newShip  // do usunięcia po testach
    }

    placeShip(ship, startLocation, direction) {

        if (startLocation[direction] + ship.length > boardSize) {
            return "cannot place ship here" // later change this to function so that it changes all left boxes class to show 'X'
        } else if (checkIfAnyBoxTaken(ship, this.board, startLocation, direction)) {
            return "cannot place ship here - collision with other ship"
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[(startLocation.x) + (i * (direction === 'x'))][startLocation.y + (i * (direction === 'y'))] = ship.name // change value of the taken location to ship name along x or y axis 
            }
        }
    }

    receiveAttack(coordinates) {
        var coordinatesOfAttack = this.board[coordinates['x']][coordinates['y']]
        if (coordinatesOfAttack === null) {
            this.missedLocations.push(`${coordinates['x']}${coordinates['y']}`)
        } else if (this.hitLocations.includes(`${coordinates['x']}${coordinates['y']}`)) {
            return 'cannot hit same position twice'
        } else {
            const shipAttacked = findShipObjectWithName(this.shipObjects, coordinatesOfAttack)
            shipAttacked.hit();
            this.hitLocations.push(`${coordinates['x']}${coordinates['y']}`)
        }
    }

    reportEntireFleetStatus() {
        return this.shipObjects.every(ship => ship.isSunk() === true)
    }

}


