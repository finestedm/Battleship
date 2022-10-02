import { Player } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";

const playerOne = new Player('Paweł', false)
const playerTwo = new Player('pieseł', true)

function gameLoop() {
    regenerateGameboard()

    var unplacedPlayerTwoShips = playerTwo.gameboard.shipObjects.filter(ship => !ship.alreadyUsed);

    while (unplacedPlayerTwoShips.length > 0) {
        playerTwo.gameboard.placeShip(unplacedPlayerTwoShips[unplacedPlayerTwoShips.length - 1], generateRandomStartingLocation(), generateRandomDirection()) && unplacedPlayerTwoShips.pop()
    }



    regenerateGameboard()

    var activePlayer = playerOne;

};

gameLoop()

function generateRandomStartingLocation() {
    return { 'x': Math.floor(Math.random() * 9), 'y': Math.floor(Math.random() * 9) }
}

function generateRandomDirection() {
    return Math.round(Math.random()) ? 'x' : 'y'
}