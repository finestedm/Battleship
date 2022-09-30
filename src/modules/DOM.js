import { Gameboard } from "./factories/gameboard"
import { players } from "./factories/player";

const root = document.getElementById('content')
root.classList = 'container'
const gameBoardHolder = document.createElement('div');
gameBoardHolder.className = 'row'
root.append(gameBoardHolder)

export function createGameboardDOM(playerObject) {

    try {
        const currentGameboard = document.querySelector(`#section-${playerObject.name}`)
        currentGameboard.remove();
    } catch (error) {
        { }
    }
    const playerPart = document.createElement('section')
    playerPart.id = `section-${playerObject.name}`;
    playerPart.className = 'col-sm row player-side';

    const GameboardDOM = document.createElement('article');
    GameboardDOM.id = `gameboard-${playerObject.name}`;
    GameboardDOM.className = 'col-sm gameboard';

    playerPart.append(GameboardDOM, createListOfUnusedShips(playerObject));

    playerObject.gameboard.board.forEach(box => GameboardDOM.append(createBoardBoxDOM(box, playerObject)));

    gameBoardHolder.append(playerPart)

    getBoxesDOM(playerObject)

}

function createBoardBoxDOM(box, playerObject) {
    const boardBox = document.createElement('button')
    boardBox.type = 'button';
    boardBox.className = `box ${playerObject.name}`;
    console.log(box)
    box.containedShip && (boardBox.style.backgroundColor = box.containedShip.color);
    boardBox.setAttribute('dataset', `${playerObject.name}`);
    boardBox.addEventListener('click', (e) => {
        if (((playerObject.gameboard.shipObjects.filter(ship => !ship.alreadyUsed)).length) === 0) {
            playerObject.isPC && playerObject.gameboard.receiveAttack(box)
        } else {
            alert('first place all your ships')
        }
    })
    return boardBox
}

export function regenerateGameboard() {
    players.forEach(playerObject => createGameboardDOM(playerObject))
}

export function createListOfUnusedShips(playerObject) {
    try {
        var existingUnusedShips = document.getElementById(`unused-ships-${playerObject.name}`)
        existingUnusedShips.remove();
    } catch (error) {
        { }
    }
    const unusedShips = document.createElement('ul');
    unusedShips.id = `unused-ships-${playerObject.name}`;
    unusedShips.className = `col-sm`
    playerObject.gameboard.shipObjects.forEach(ship => {
        !ship.alreadyUsed && unusedShips.append(createShipDiv(playerObject, ship))
    });
    return unusedShips
}

function createShipDiv(playerObject, ship) {
    const shipContainer = document.createElement('li')
    shipContainer.innerText = ship.name;
    shipContainer.addEventListener('click', () => {
        playerObject.gameboard.placeShip(ship, { x: (Math.floor(Math.random() * 9)), y: (Math.floor(Math.random() * 9)) }, 'x')

        regenerateGameboard(playerObject);
    })
    return shipContainer
}

function getBoxesDOM(playerObject) {
    //.gameboard.shipObjects.filter(ship => !ship.alreadyUsed))

    const boxes = document.querySelectorAll(`.box`) //select only players boxes
    boxes.forEach(box => box.addEventListener('mouseover', (e) => {
        console.log(boxes)
    }))
};
