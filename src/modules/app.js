import { Player, players } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";

const playerOne = new Player('Paweł', false)
const playerTwo = new Player('pieseł', true)
export var activePlayer = playerTwo;

export function changePlayer() {
    activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    activePlayer === playerOne && letPCAttack()
}

createGameboardDOM(playerOne)


export function gameLoop() {

    while (playerTwo.gameboard.unusedShips.length > 0) {
        playerTwo.gameboard.placeShip(playerTwo.gameboard.unusedShips[playerTwo.gameboard.unusedShips.length - 1], generateRandomStartingLocation(), generateRandomDirection())
    }
    regenerateGameboard()

};

export function announceWinner() {
    (playerOne.gameboard.reportEntireFleetStatus()) ? console.log('playerOne is winner') : console.log('playerTwo is winner')
}

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
