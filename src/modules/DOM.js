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
root.append(gameBoardHolder)
document.querySelector('body').append(createFooter())


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
    // add additional marking to the whole ship sunk
    try {
        box.containedShip.isSunk() ? boardBox.classList.add('sunk') : {};
    } catch (error) { }
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

export function createDirectionChanger() {
    const directionChangerHolder = document.createElement('div');
    directionChangerHolder.id = 'direction-changer-holder'
    directionChangerHolder.className = "row mx-auto mt-3 justify-content-center text-center"
    const directionChanger = document.createElement('button');
    directionChanger.innerHTML = `<h4 class="col text-center">Ship placing direction: <strong>${changeDirectionIntoArrows(shipPlacingDirection)}</strong> </h4>`;
    directionChanger.id = 'direction-changer'
    directionChanger.className = "col-sm-4 text-center btn btn-primary"
    directionChanger.addEventListener('click', () => {
        shipPlacingDirection === 'x' ? shipPlacingDirection = 'y' : shipPlacingDirection = 'x'
        directionChanger.innerHTML = `<h4 class="col text-center">Ship placing direction: <strong>${changeDirectionIntoArrows(shipPlacingDirection)}</strong> </h4>`;
    })
    directionChangerHolder.append(directionChanger)
    root.append(directionChangerHolder)
}

function removeDirectionChanger() {
    try {
        const directionChanger = document.getElementById('direction-changer-holder');
        directionChanger.remove()
    } catch (e) {
    }
}

function changeDirectionIntoArrows(direction) {
    return direction === 'x' ? '⇕' : '⇔';
}

function createFooter() {
    const footer = document.createElement('footer')
    footer.className = 'fixed-bottom'
    footer.innerHTML =
        `<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        <a
        class="btn btn-link btn-floating btn-lg text-dark m-1"
        href="https://github.com/finestedm/Battleship/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i class="fab fa-github"></i
      ><svg><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg></a>
        </a> <a class="text-white" href="https://github.com/finestedm/Battleship/">Created by Paweł Stępień</a>
    </div>`
    return footer
}