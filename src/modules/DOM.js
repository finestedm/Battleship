import { Gameboard } from "./factories/gameboard"

const root = document.getElementById('content')

export function createGameboardDOM(playerObject) {
    const GameboardDOM = document.createElement('section')
    playerObject.gameboard.board.forEach(setOfBoxes => {
        setOfBoxes.forEach(box => GameboardDOM.append(createBoardBoxDOM(box)))
    })
    root.append(GameboardDOM)
}

function createBoardBoxDOM(box) {
    const boardBox = document.createElement('button')
    boardBox.type = 'button';
    console.log(box)
    boardBox.innerText = box
    return boardBox
}

export function regenerateGameboard(playerObject) {
    createGameboardDOM(playerObject)
}