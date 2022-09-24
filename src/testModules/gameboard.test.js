import { Gameboard } from '../modules/gameboard';
import { Ship } from '../modules/ship';

export const newShip = new Ship('pies', 5);
export const newShip2 = new Ship('pies2', 3);

test('constructor inside gameboard', () => {
    expect(newShip.name).toBe('pies')
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


test('gameboard board array test 2', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(newShip, { 'x': 2, 'y': 3 }, 'x')
    expect(newBoard.board[1][3]).toBe(null)
    expect(newBoard.board[2][3]).toBe(newShip.name)
    expect(newBoard.board[3][3]).toBe(newShip.name)
    expect(newBoard.board[2 + newShip.length - 1][3]).toBe(newShip.name)
    expect(newBoard.board[2][5]).toBe(null)
});

test('gameboard board array test 2', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    expect(newBoard.board[2][3]).toBe(newShip2.name)
    expect(newBoard.board[2][4]).toBe(newShip2.name)
    expect(newBoard.board[2][3 + newShip2.length - 1]).toBe(newShip2.name)
    expect(newBoard.board[2][7]).toBe(null)
});

test('gameboard board ship too long', () => {
    const newBoard = new Gameboard();
    expect(newBoard.placeShip(newShip2, { 'x': 2, 'y': 9 }, 'y')).toBe('cannot place ship here')
});

test('gameboard board ship too long 2', () => {
    const newBoard = new Gameboard();
    expect(newBoard.placeShip(newShip, { 'x': 8, 'y': 9 }, 'x')).toBe('cannot place ship here')
});

test('gameboard board ship receives attach and hit', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    expect(newBoard.receiveAttack({ 'x': 2, 'y': 3 })).toBe(`ship ${newShip2.name} was hit`)
    expect(newBoard.receiveAttack({ 'x': 2, 'y': 5 })).toBe(`ship ${newShip2.name} was hit`)
});

test('gameboard board ship receives attach and misses', () => {
    const newBoard = new Gameboard();
    newBoard.placeShip(newShip2, { 'x': 2, 'y': 3 }, 'y')
    expect(newBoard.receiveAttack({ 'x': 2, 'y': 6 })).toBe(`missed`)
});