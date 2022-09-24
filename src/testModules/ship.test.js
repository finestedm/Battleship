import { Ship, shipObjects, findShipObjectWithName } from "../modules/factories/ship";

const newShip = new Ship('pies', 5);

test('ship constructor', () => {
    expect(newShip.name).toBe('pies');
    expect(newShip.length).toBe(5);
})

test('ship hit', () => {
    newShip.hit()
    expect(newShip.hitPositions).toStrictEqual(1);
    newShip.hitPositions = 0;
});

test('ship is sunk - all positions hit', () => {
    newShip.hit()
    newShip.hit()
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.hitPositions).toBe(5);
    expect(newShip.isSunk).toBeTruthy();
    newShip.hitPositions = 0;
});

test('ship is sunk = not all positions hit', () => {
    newShip.hit()
    newShip.hit()
    newShip.hit()
    newShip.hit()
    expect(newShip.hitPositions).toStrictEqual(4);
    expect(newShip.isSunk).toBeTruthy();
});

