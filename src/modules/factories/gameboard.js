import { Ship } from './ship.js';
import { Box, findBoxObject } from './box.js';

export const boardSize = 10;



export function findShipObjectWithName(shipObjects, name) {
    return shipObjects.filter(ship => ship.name === name)[0]
}

function illegalMove() {
    console.log('this is illegal move')
    return false
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
        for (let x = 1; x <= boardSize; x++) {
            for (let y = 1; y <= boardSize; y++) {
                this.board.push(new Box(x, y))
            }
        }
    }

    createNewShip(name, length) {
        const newShip = new Ship(name, length)
        this.shipObjects.push(newShip)
        return newShip  // do usunięcia po testach
    }

    placeShip(ship, startLocation, direction) { //ensure that startlocation is a Box Object
        if (startLocation[direction] + ship.length > boardSize) {
            return "cannot place ship here" // later change this to function so that it changes all left boxes class to show X
        } else if (checkIfAnyBoxTaken(ship, this.board, startLocation, direction)) {
            return "cannot place ship here - collision with other ship"
        } else {
            for (let i = 0; i < ship.length; i++) {
                this.board[(startLocation.x) + (i * (direction === 'x'))][startLocation.y + (i * (direction === 'y'))] = ship.name // change value of the taken location to ship name along x or y axis 
                ship.alreadyUsed = true;
            }
        }
    }

    receiveAttack(coordinates) {
        var shipName = this.board[coordinates['x']][coordinates['y']]
        if (this.hitLocations.includes(`${coordinates['x']}${coordinates['y']}`)) {
            return illegalMove()
        } else if (shipName === null) {
            this.missedLocations.push(`${coordinates['x']}${coordinates['y']}`)
        } else {
            this.shipHit(coordinates['x'], coordinates['y'], shipName)
        }
    }

    reportEntireFleetStatus() {
        return this.shipObjects.every(ship => ship.isSunk() === true)
    }

    shipHit(coordX, coordY, shipName) {
        const shipAttacked = findShipObjectWithName(this.shipObjects, shipName)
        shipAttacked.hit();
        this.hitLocations.push(`${coordX}${coordY}`)
    }


    checkIfAnyBoxTaken(ship, startLocation, direction) {
        var hitLocationBoxObjects = [];
        for (let i = 0; i < ship.length; i++) {
            if (direction === 'x') {
                hitLocationBoxObjects.push(this.board[((startLocation.x - 1) * 10) + (i * 10)])
            } else if (direction === 'y') {
                hitLocationBoxObjects.push(this.board[(startLocation.y - 1) + (i)])
            }
        }
        return hitLocationBoxObjects.filter(location => location.containedShip !== null).length > 0;
    }
}



