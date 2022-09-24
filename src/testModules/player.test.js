import { Player } from "../modules/factories/player"

const newPlayer = new Player('pies');

test('Player creation', () => {
    expect(newPlayer.name).toBe('pies')
    expect(newPlayer.gameboard.shipObjects.length).toBe(4)
})

