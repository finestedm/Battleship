import { Ship, shipObjects, findShipObjectWithName } from "../modules/ship";

const newShip = new Ship('pies', 5);

test('ship constructor', () => {
    expect(newShip.name).toBe('pies');
    expect(newShip.length).toBe(5);
})

test('ship hit', () => {
    newShip.hit(4)
    expect(newShip.hitPositions).toStrictEqual([4]);
    newShip.hitPositions = [];
});

test('ship is sunk - all positions hit', () => {
    newShip.hit(1)
    newShip.hit(2)
    newShip.hit(3)
    newShip.hit(4)
    newShip.hit(5)
    expect(newShip.hitPositions).toStrictEqual([1, 2, 3, 4, 5]);
    expect(newShip.isSunk).toBeTruthy();
    newShip.hitPositions = [];
});

test('ship is sunk = not all positions hit', () => {
    newShip.hit(2)
    newShip.hit(3)
    newShip.hit(4)
    newShip.hit(5)
    expect(newShip.hitPositions).toStrictEqual([2, 3, 4, 5]);
    expect(newShip.isSunk).toBeTruthy();
});

test('ship is in shipObjects array', () => {
    expect(shipObjects.includes(newShip)).toBeTruthy();
});

test('findShipObjectWithName returns an object', () => {
    expect(findShipObjectWithName(newShip.name)).toBe(newShip);
});
