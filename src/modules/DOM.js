import { Gameboard } from "./factories/gameboard"

const root = document.getElementById('content')
root.classList = 'container'
const gameBoardHolder = document.createElement('div');
gameBoardHolder.className = 'row row-cols-2'
root.append(gameBoardHolder)

export function createGameboardDOM(playerObject) {
    try {
        const currentGameboard = document.querySelector(`#gameboard-${playerObject.name}`)
        currentGameboard.remove();
    } catch (error) {
        { }
    }
    const GameboardDOM = document.createElement('section');
    GameboardDOM.id = `gameboard-${playerObject.name}`;
    GameboardDOM.className = 'container gameboard';

    for (let x = 0; x < 10; x++) {
        const setOfBoxes = playerObject.gameboard.board[x];
        for (let y = 0; y < setOfBoxes.length; y++) {
            const box = setOfBoxes[y]
            GameboardDOM.append(createBoardBoxDOM(box, playerObject, x, y));
        }
    }

    gameBoardHolder.append(GameboardDOM, createListOfUnusedShips(playerObject))
}

function createBoardBoxDOM(box, playerObject, x, y) {
    const boardBox = document.createElement('button')
    boardBox.type = 'button';
    boardBox.className = 'box'
    boardBox.innerText = box
    boardBox.addEventListener('click', () => playerObject.gameboard.receiveAttack({ x: x, y: y }))
    return boardBox
}

export function regenerateGameboard(playerObject) {
    createGameboardDOM(playerObject)
}

export function createListOfUnusedShips(playerObject) {
    try {
        var existingUnusedShips = document.getElementById(`unused-ships-${playerObject.name}`)
        console.log(existingUnusedShips)
        existingUnusedShips.remove();
    } catch (error) {
        { }
    }
    const unusedShips = document.createElement('ul');
    unusedShips.id = `unused-ships-${playerObject.name}`
    playerObject.gameboard.shipObjects.forEach(ship => {
        !ship.alreadyUsed && unusedShips.append(createShipDiv(ship))
    });
    return unusedShips
}

function createShipDiv(ship) {
    const shipContainer = document.createElement('li')
    shipContainer.innerText = ship.name;
    return shipContainer
}