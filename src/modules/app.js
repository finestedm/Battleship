import { Player, players } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";

const playerOne = new Player('Paweł', false)
const playerTwo = new Player('pieseł', true)
export var activePlayer = playerTwo;

export function changePlayer() {
    activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    activePlayer === playerOne && letPCAttack()
}

function gameLoop() {
    regenerateGameboard()
    var unplacedPlayerTwoShips = playerTwo.gameboard.shipObjects.filter(ship => !ship.alreadyUsed);

    while (unplacedPlayerTwoShips.length > 0) {
        playerTwo.gameboard.placeShip(unplacedPlayerTwoShips[unplacedPlayerTwoShips.length - 1], generateRandomStartingLocation(), generateRandomDirection()) && unplacedPlayerTwoShips.pop()
    }
    regenerateGameboard()

};

gameLoop()

function generateRandomStartingLocation() {
    return { 'x': Math.floor(Math.random() * 9), 'y': Math.floor(Math.random() * 9) }
}

function generateRandomDirection() {
    return Math.round(Math.random()) ? 'x' : 'y'
}

function letPCAttack() {
    if (playerOne.gameboard.receiveAttack(playerOne.gameboard.board[Math.floor(Math.random() * 100)]) === 'illegal move') {
        letPCAttack()
    } else {
        changePlayer();
        regenerateGameboard()
    }
}
