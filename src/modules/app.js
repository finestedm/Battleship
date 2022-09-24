import { Player } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";

const playerOne = new Player('Paweł', false)
const playerTwo = new Player('pieseł', false)

function gameLoop() {
    createGameboardDOM(playerOne)
    // createGameboardDOM(playerTwo)

    playerOne.gameboard.placeShip(playerOne.gameboard.shipObjects[0], { x: 2, y: 3 }, 'y')
    playerOne.gameboard.placeShip(playerOne.gameboard.shipObjects[1], { x: 4, y: 5 }, 'y')

    regenerateGameboard(playerOne)

    var activePlayer = playerOne;



};

gameLoop()