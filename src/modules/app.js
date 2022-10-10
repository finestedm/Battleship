import { Player, players } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";
import { showModal } from "./showModal";
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');


export function changePlayer() {
    activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    activePlayer === playerOne && letPCAttack()
}

var playerOne = new Player('Paweł', false)
var playerTwo = new Player('pieseł', true)
showModal();
var myModal = new bootstrap.Modal(document.getElementById("my-modal"), {});
myModal.show()
const nameButton = document.getElementById('btn-name-save')
nameButton.addEventListener('click', () => {
    const newPlayerNameInput = document.getElementById('new-player-name');
    playerOne.name = newPlayerNameInput.value
    if (newPlayerNameInput.validity.valid) {
        myModal.hide()
        createGameboardDOM(playerOne)
        // } else if (!newPlayerNameInput.validity.valid) {
        //     newPlayerNameInput.setCustomValidity("Please provide your name");
        //     newPlayerNameInput.reportValidity();
    }
})

export function gameLoop() {


    while (playerTwo.gameboard.unusedShips.length > 0) {
        playerTwo.gameboard.placeShip(playerTwo.gameboard.unusedShips[playerTwo.gameboard.unusedShips.length - 1], generateRandomStartingLocation(), generateRandomDirection())
    }
    regenerateGameboard()

};

export var activePlayer = playerTwo;

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
