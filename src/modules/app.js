import { Player, players } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";
import { showModal, bootstrapValidation } from "./showModal";
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
const newPlayerNameInput = document.getElementById('new-player-name');
nameButton.addEventListener('click', () => {
    bootstrapValidation()
    if (newPlayerNameInput.validity.valueMissing) {
        playerOne.name = newPlayerNameInput.value
        newPlayerNameInput.setCustomValidity("Please provide your name");
        newPlayerNameInput.reportValidity();
    } else if (newPlayerNameInput.validity.patternMismatch) {
        newPlayerNameInput.setCustomValidity("Please provide your name without numbers nor special characters");
        newPlayerNameInput.reportValidity();
    } else {
        newPlayerNameInput.setCustomValidity('');
        myModal.hide()
        createGameboardDOM(playerOne)
    }
});


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
