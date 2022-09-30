import { Gameboard, findShipObjectWithName, checkIfAnyBoxTaken } from '../modules/factories/gameboard';
import { Ship } from '../modules/factories/ship';

// export const newShip = new Ship('pies', 5);
// export const newShip2 = new Ship('pies2', 3);

test('constructor inside gameboard', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 3);
    expect(newBoard.shipObjects[0]).toBe(newShip)
});

test('constructor of gameboard', () => {
    const newBoard = new Gameboard();
    expect(typeof newBoard).toBe('object')
});

test('gameboard board array test 1', () => {
    const newBoard = new Gameboard();
    expect(newBoard.board.length).toBe(10)
    expect(newBoard.board[0].length).toBe(10)
});

test('ship is in shipObjects array', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 3);
    expect(newBoard.shipObjects[0]).toBe(newShip);
});

test('findShipObjectWithName returns an object', () => {
    const newBoard = new Gameboard();
    const newShip3 = newBoard.createNewShip('pies2', 3);

    expect(findShipObjectWithName(newBoard.shipObjects, newShip3.name)).toBe(newShip3);
});

test('gameboard board array test 2', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 3);
    newBoard.placeShip(newShip, { 'x': 2, 'y': 3 }, 'x')
    expect(newBoard.board[1][3]).toBe(null)
    expect(newBoard.board[2][3]).toBe(newShip.name)
    expect(newBoard.board[3][3]).toBe(newShip.name)
    expect(newBoard.board[2 + newShip.length - 1][3]).toBe(newShip.name)
    expect(newBoard.board[2][5]).toBe(null)
});

test('gameboard board array test 3', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies', 3);
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    expect(newBoard.board[2][3]).toBe(newShip2.name)
    expect(newBoard.board[2][4]).toBe(newShip2.name)
    expect(newBoard.board[2][3 + newShip2.length - 1]).toBe(newShip2.name)
    expect(newBoard.board[2][7]).toBe(null)
});

test('gameboard board ship too long', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies', 3);
    expect(newBoard.placeShip(newShip2, { 'x': 2, 'y': 9 }, 'y')).toBe('cannot place ship here')
});

test('gameboard board ship too long 2', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 5);
    expect(newBoard.placeShip(newShip, { 'x': 8, 'y': 9 }, 'x')).toBe('cannot place ship here')
});

test('gameboard place 2 ship with collision with other ship', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 5);
    const newShip2 = newBoard.createNewShip('pies2', 3);

    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    expect(newBoard.placeShip(newShip, { 'x': 2, 'y': 3 }, 'y')).toBe(`cannot place ship here - collision with other ship`)
});

test.only('gameboard place ship with collision with other ship 2', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 5);
    const startLocation = newBoard.board[13];
    const newShip2 = newBoard.createNewShip('pies2', 3);
    const startLocation2 = newBoard.board[43];
    newBoard.placeShip(newShip, startLocation, 'x')
    expect(newBoard.placeShip(newShip2, startLocation2, 'y')).toBe(`cannot place ship here - collision with other ship`)
});

test('gameboard place ship with no collision with other ship', () => {
    const newBoard = new Gameboard();
    const newShip = newBoard.createNewShip('pies', 5);
    const startLocation = newBoard.board[3];
    const newShip2 = newBoard.createNewShip('pies2', 3);
    const startLocation2 = newBoard.board[50];
    newBoard.placeShip(newShip, startLocation, 'x')
    expect(newBoard.placeShip(newShip2, startLocation2, 'y')).toBe(undefined)
});

test('gameboard board ship receives attach and hit', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies2', 3);
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    newBoard.receiveAttack({ 'x': 2, 'y': 3 });
    expect(newBoard.hitLocations.includes('23')).toBeTruthy();
    expect(newShip2.hitPositions).toBe(1)

});

test('gameboard board ship receives attach and misses', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies2', 3);
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    newBoard.receiveAttack({ 'x': 2, 'y': 6 })
    expect(newBoard.missedLocations.includes('26')).toBeTruthy()

});

test('gameboard all ships sunk', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies2', 3);
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    newBoard.receiveAttack({ 'x': 2, 'y': 3 })
    expect(newBoard.reportEntireFleetStatus()).toBeFalsy()
    newBoard.receiveAttack({ 'x': 2, 'y': 4 })
    newBoard.receiveAttack({ 'x': 2, 'y': 5 })
    expect(newBoard.reportEntireFleetStatus()).toBeTruthy()
});

test('check if any box taken', () => {
    const newBoard = new Gameboard();
    const newShip2 = newBoard.createNewShip('pies2', 3);
    const testBoxOccupies = newBoard.board[2]
    testBoxOccupies.containedShip = 'pies'
    const testBox = newBoard.board[20]
    expect(newBoard.checkIfAnyBoxTaken(newShip2, testBox, 'y')).toBeTruthy();
})