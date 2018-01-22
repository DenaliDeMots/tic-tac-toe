let ai = require('./ticTacToe_HardAi')

const x = 'X';
const y = 'Y';
const u = undefined;

test('impendingMatchLocation finds impending matches', () => {
    //find rows
    let grid = [
        [x,u,x],
        [u,y,u],
        [u,u,u]
    ]
    let expectedMatch = {
        unfilledCoordinates: {
            x: 1,
            y: 0
        },
        playerAboutToWin: x
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
    grid = [
        [x,u,u],
        [u,y,x],
        [y,y,u]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 2,
            y: 2
        },
        playerAboutToWin: y
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
    grid = [
        [x,u,u],
        [u,y,x],
        [x,y,u]
    ]
    expectedMatch = false
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)

    //match columns
    //TODO

    //match diagonals
    //TODO
})