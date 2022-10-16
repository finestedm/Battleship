import { boardSize, Gameboard } from "./factories/gameboard"
import { players } from "./factories/player";
import { letPCAttack, changePlayer, activePlayer, placeAllPCShips } from "./app";
import { gameLoop } from "./app";
import { announceWinner } from "./modals";

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
    playerPart.className = 'col-sm mt-5 ms-2 row align-items-center player-side';
    // create player gameboard
    const GameboardDOM = document.createElement('article');
    const playerSideHeader = document.createElement('h4')
    playerSideHeader.innerText = `${playerObject.name}'s board`
    playerSideHeader.className = 'text-center'
    GameboardDOM.id = `gameboard-${playerObject.name}`;
    GameboardDOM.className = 'col-sm gameboard justify-content-center';

    playerPart.append(playerSideHeader, GameboardDOM)
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
            if (playerObject.gameboard.unusedShips.length > 1) {
                playerObject.gameboard.placeShip(findUnplacedShips(playerObject).slice(-1)[0], box, shipPlacingDirection)
                createGameboardDOM(playerObject)
            } else if (playerObject.gameboard.unusedShips.length === 1) {   // with the last ship we can generate playerTwo part and begin game...
                playerObject.gameboard.placeShip(findUnplacedShips(playerObject).slice(-1)[0], box, shipPlacingDirection)
                if (playerObject.gameboard.unusedShips.length === 0) {      // ...but only if after above click the ships was placed correctly!
                    regenerateGameboard()
                    placeAllPCShips()
                }
            }
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
    players.forEach(playerObject => playerObject.gameboard.reportEntireFleetSunk() ? announceWinner(players.slice(playerObject, 1)[0]) : {})
    players.forEach(playerObject => createGameboardDOM(playerObject))
}

export function createListOfUnusedShips(playerObject) {
    try {
        var existingUnusedShips = document.getElementById(`unused-ships-${playerObject.name}`)
        existingUnusedShips.remove();
    } catch (error) {
        { }
    }
    const unusedShipsContainer = document.createElement('div');
    unusedShipsContainer.innerHTML = '<h5>Place these ships:</h5>'
    unusedShipsContainer.className = 'text-center col-sm'
    const unusedShips = document.createElement('ul');
    unusedShips.id = `unused-ships-${playerObject.name}`;
    unusedShips.className = `text-center col-sm list-unstyled`
    unusedShipsContainer.append(unusedShips);
    playerObject.gameboard.unusedShips.forEach(ship => {
        unusedShips.append(createShipDiv(playerObject, ship))
    });
    return unusedShipsContainer
}

function createShipDiv(playerObject, ship) {
    const shipContainer = document.createElement('li');
    shipContainer.className = 'col ship-to-place row justify-content-between'
    const shipName = document.createElement('h5');
    shipName.className = 'col ship-to-place-name d-inline-flex'
    shipName.innerText = ship.name;
    const shipDiv = document.createElement('div');
    shipDiv.className = 'col ship-square-container d-inline-flex';
    for (let i = 0; i < ship.length; i++) {
        const square = document.createElement('div');
        square.className = 'ship-len-square'
        square.style.backgroundColor = ship.color;
        shipDiv.append(square);
    }
    shipContainer.append(shipName, shipDiv)
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

export function getAllBoxes(playerObject) {
    return document.querySelectorAll(`.box.${playerObject.name}`);
}

function findUnplacedShips(playerObject) {
    return playerObject.gameboard.unusedShips
}

function createDirectionChanger() {
    const directionChangerHolder = document.createElement('div');
    directionChangerHolder.id = 'direction-changer-holder'
    directionChangerHolder.className = "row mx-auto mt-3 justify-content-center text-center"
    directionChangerHolder.innerHTML = '<h2> Change ship placing direction </h2>'

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
        const directionChanger = document.getElementById('direction-changer-holder');
        directionChanger.remove()
    } catch (e) {
    }
}
