import { Box } from "../modules/factories/box";

test('box constructor', () => {
    expect(typeof new Box()).toBe('object')
});

test('box values', () => {
    const newBox = new Box(1, 2)
    expect(newBox.x).toBe(1)
    expect(newBox.y).toBe(2)
    expect(newBox.containedShip).toBe(null)
    newBox.containedShip = 'pies'
    expect(newBox.containedShip).toBe('pies')

});
