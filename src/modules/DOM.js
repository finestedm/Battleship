import { boardSize, Gameboard } from "./factories/gameboard"
import { players } from "./factories/player";
import { letPCAttack, changePlayer, activePlayer } from "./app";
import { gameLoop, announceWinner } from "./app";

var shipPlacingDirection = 'x'

const root = document.getElementById('content')
root.classList = 'container'
const gameBoardHolder = document.createElement('div');
gameBoardHolder.className = 'row'
root.append(gameBoardHolder, createDirectionChanger())


export function createGameboardDOM(playerObject) {
    //reset the board
    try {
        const currentGameboard = document.querySelector(`#section-${playerObject.name}`)
        currentGameboard.remove();
    } catch (error) {
        { }
    }

    // remove direction changer when all ships are placed
    var onlyHumanPlayer = (players.filter(player => !player.isPC))
    const unusedShipsOfHumanPlayer = onlyHumanPlayer.reduce(
        (previousValue, currentValue) => previousValue + findUnplacedShips(currentValue).length,
        0);
    unusedShipsOfHumanPlayer === 0 && removeDirectionChanger()

    //create each player side
    const playerPart = document.createElement('section')
    playerPart.id = `section-${playerObject.name}`;
    playerPart.className = 'col-sm row player-side';
    // create player gameboard
    const GameboardDOM = document.createElement('article');
    GameboardDOM.id = `gameboard-${playerObject.name}`;
    GameboardDOM.className = 'col-sm gameboard justify-content-center';

    playerPart.append(GameboardDOM)
    playerObject.gameboard.unusedShips.length > 0 ? playerPart.append(createListOfUnusedShips(playerObject)) : {}

    playerObject.gameboard.board.forEach(box => GameboardDOM.append(createBoardBoxDOM(box, playerObject)));

    gameBoardHolder.append(playerPart)
}

function createBoardBoxDOM(box, playerObject) {
    const boardBox = document.createElement('button')
    boardBox.type = 'button';
    boardBox.className = `box ${playerObject.name} justify-content-center`;
    // change color if the location is hit
    (box.isHit) && (box.containedShip === null ? boardBox.classList.add('missed') : boardBox.classList.add('hit'))
    // change color if the boxes to ship color but only if the player is human
    box.containedShip && !playerObject.isPC && (boardBox.style.backgroundColor = box.containedShip.color);
    boardBox.addEventListener('click', () => {
        if (((findUnplacedShips(playerObject).length) === 0) && (playerObject === activePlayer)) {
            if (playerObject.gameboard.receiveAttack(box) !== 'illegal move') {
                changePlayer();
            }
            regenerateGameboard()
        } else {
            playerObject.gameboard.placeShip(findUnplacedShips(playerObject).slice(-1)[0], box, shipPlacingDirection)
            createGameboardDOM(playerObject)
            playerObject.gameboard.unusedShips.length === 0 ? gameLoop() : {}
        }
    })

    boardBox.addEventListener('mouseover', () => {
        const shipToPlace = findUnplacedShips(playerObject)[findUnplacedShips(playerObject).length - 1];        // takes last unused ship
        const boxes = getAllBoxes(playerObject);
        shipToPlace && hoverPlacingEffect(playerObject, shipToPlace, box, boxes, shipPlacingDirection); // hover effect is only invoked when there is still a ship not placed
    })

    boardBox.addEventListener('mouseout', () => {
        const boxes = getAllBoxes(playerObject);
        boxes.forEach(box => box.classList.remove('hover'))
    })

    return boardBox
}

export function regenerateGameboard() {
    players.forEach(playerObject => playerObject.gameboard.reportEntireFleetStatus() ? announceWinner() : {})
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
    findUnplacedShips(playerObject).forEach(ship => {
        unusedShips.append(createShipDiv(playerObject, ship))
    });
    return unusedShips
}

function createShipDiv(playerObject, ship) {
    const shipContainer = document.createElement('li')
    shipContainer.innerText = ship.name + ', length: ' + ship.length;
    shipContainer.addEventListener('click', () => {
        playerObject.gameboard.placeShip(ship, { x: (Math.floor(Math.random() * 9)), y: (Math.floor(Math.random() * 9)) }, 'x')

        regenerateGameboard(playerObject);
    })
    return shipContainer
}

function hoverPlacingEffect(playerObject, shipObject, box, boxes, direction) {
    if ((shipObject.length + box[direction] <= boardSize) && (!playerObject.gameboard.checkIfAnyBoxTaken(shipObject, box, direction))) {
        for (let i = 0; i < shipObject.length; i++) {
            if (direction === 'x') {
                boxes[((box.x) * 10) + (i * 10) + (box.y)].classList.add('hover')
            } else if (direction === 'y') {
                boxes[(box.x * 10 + (i)) + box.y].classList.add('hover')
            }
        }
    }
}

function getAllBoxes(playerObject) {
    return document.querySelectorAll(`.box.${playerObject.name}`);
}

function findUnplacedShips(playerObject) {
    return playerObject.gameboard.unusedShips
}

function createDirectionChanger() {
    const directionChangerHolder = document.createElement('div');
    directionChangerHolder.id = 'direction-changer-holder'
    directionChangerHolder.className = "row text-center"

    const directionChanger = document.createElement('button');
    directionChanger.innerText = `Current ship placing direction: ${shipPlacingDirection}`;
    directionChanger.id = 'direction-changer'
    directionChanger.className = "col-sm-4 text-center btn btn-primary"
    directionChanger.addEventListener('click', () => {
        shipPlacingDirection === 'x' ? shipPlacingDirection = 'y' : shipPlacingDirection = 'x'
        directionChanger.textContent = `Current ship placing direction: ${shipPlacingDirection}`;
    })
    directionChangerHolder.append(directionChanger)
    return directionChangerHolder
}

function removeDirectionChanger() {
    try {
        const directionChanger = document.getElementById('direction-changer');
        directionChanger.remove()
    } catch (e) {

    }

}