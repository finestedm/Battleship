import { Player } from "./factories/player";
import { createGameboardDOM, regenerateGameboard } from "./DOM";

const playerOne = new Player('Paweł', false)
const playerTwo = new Player('pieseł', false)


function chooseShipLocation() {

}

function gameLoop() {
    createGameboardDOM(playerOne)

    console.log(playerOne.gameboard.shipObjects)

    createGameboardDOM(playerTwo)

    playerTwo.gameboard.placeShip(playerTwo.gameboard.shipObjects[0], { x: 2, y: 3 }, 'y')
    playerTwo.gameboard.placeShip(playerTwo.gameboard.shipObjects[1], { x: 2, y: 9 }, 'x')

    createGameboardDOM(playerTwo)


    var activePlayer = playerOne;

};

gameLoop()