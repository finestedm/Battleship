import { Player, players } from "./factories/player";
import { createGameboardDOM, getAllBoxes, regenerateGameboard } from "./DOM";
import { showModal, bootstrapValidation } from "./showModal";
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');


var playerOne = new Player('Paweł', false)
var playerTwo = new Player('PC', true)
export var activePlayer = playerTwo;
activePlayer === playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
export function changePlayer() {
    activePlayer === playerOne && letPCAttack()
}

(function gameLoop() {

    showModal();
    var myModal = new bootstrap.Modal(document.getElementById("my-modal"), {});
    myModal.show()
    const newPlayerNameInput = document.getElementById('new-player-name');
    newPlayerNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && newPlayerNameValidation()) {
            myModal.hide();
            createGameboardDOM(playerOne)
        }
    });
    const nameButton = document.getElementById('btn-name-save')
    nameButton.addEventListener('click', () => {
        if (newPlayerNameValidation()) {
            myModal.hide();
            createGameboardDOM(playerOne)
        }
    })
})();

function newPlayerNameValidation() {
    const newPlayerNameInput = document.getElementById('new-player-name');
    bootstrapValidation();
    if (newPlayerNameInput.validity.valueMissing) {
        newPlayerNameInput.setCustomValidity("Please provide your name");
        newPlayerNameInput.reportValidity();
        return false
    } else if (newPlayerNameInput.validity.patternMismatch) {
        newPlayerNameInput.setCustomValidity("Please provide your name without numbers nor special characters");
        newPlayerNameInput.reportValidity();
        return false
    } else {
        playerOne.name = newPlayerNameInput.value
        newPlayerNameInput.setCustomValidity('');
        return true
    }
}

export function placeAllPCShips() {
    while (playerTwo.gameboard.unusedShips.length > 0) {
        playerTwo.gameboard.placeShip(playerTwo.gameboard.unusedShips[playerTwo.gameboard.unusedShips.length - 1], generateRandomStartingLocation(), generateRandomDirection())
    }
    regenerateGameboard()
}

export function announceWinner(playerObject) {
    playerObject === playerOne ? console.log('playerTwo is winner') : console.log('playerTwo is winner')
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