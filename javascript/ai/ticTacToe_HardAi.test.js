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
    let expectedCoordinates = {
            x: 1,
            y: 0
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(false)
    grid = [
        [x,u,u],
        [u,y,y],
        [u,u,u]
    ]
    expectedCoordinates = {
            x: 0,
            y: 1
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(expectedCoordinates)
    grid = [
        [x,u,u],
        [u,y,u],
        [x,x,u]
    ]
    expectedCoordinates = {
            x: 2,
            y: 2
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(false)

    //find columns
    grid = [
        [x,u,u],
        [u,y,u],
        [x,u,u]
    ]
    expectedCoordinates = {
            x: 0,
            y: 1
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(false)
    grid = [
        [x,u,u],
        [u,y,x],
        [u,y,u]
    ]
    expectedCoordinates = {
            x: 1,
            y: 0
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(expectedCoordinates)
    //find diagonals
    grid = [
        [x,u,u],
        [u,x,u],
        [u,y,u]
    ]
    expectedCoordinates = {
            x: 2,
            y: 2
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(false)
    grid = [
        [x,u,y],
        [u,y,u],
        [u,x,u]
    ]
    expectedCoordinates = {
            x: 0,
            y: 2
        }
    expect(ai.impendingMatchLocation(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(expectedCoordinates)

    //no match for grids with no impending matches
    grid = [
        [x,u,u],
        [u,y,u],
        [u,x,u]
    ]
    expect(ai.impendingMatchLocation(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocation(grid, y)).toEqual(false)
})   

test('ai function plays correct opening move', () => {
    //ai plays in center when available
    let a = 'ai';
    let p = 'player'
    let grid = [
        [u,u,u],
        [u,u,u],
        [u,u,u]
    ]
    let move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})

    grid = [
        [u,u,u],
        [p,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})

    //ai playes in top left corner when center is unavailable
    grid = [
        [u,u,u],
        [u,p,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})
})

test('ai function chooses winning move', () => {
    let a = 'ai';
    let p = 'player'
    let grid = [
        [a,a,u],
        [u,p,u],
        [u,u,u]
    ]
    let move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 0})
    grid = [
        [p,a,u],
        [p,a,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 2})
    grid = [
        [u,u,u],
        [u,a,p],
        [a,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 0})
})

test('ai blocks impending loss', () => {
    let a = 'ai';
    let p = 'player'
    let grid = [
        [a,p,u],
        [u,p,u],
        [u,u,u]
    ]
    let move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 2})
    grid = [
        [u,u,u],
        [u,a,u],
        [p,p,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 2})
    grid = [
        [u,u,u],
        [u,p,u],
        [a,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})
})

test('checkGridForMatches correctly identifies rows, columns, or diagonals of matching elements', () => {
    //matches rows
    let grid = [
        [x,x,x],
        [u,y,u],
        [u,u,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(true);
    expect(checkGridForMatches(y, grid)).toEqual(false);

    grid = [
        [x,u,x],
        [y,y,y],
        [x,u,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(false);
    expect(checkGridForMatches(y, grid)).toEqual(true);

    //matches columns
    grid = [
        [x,u,x],
        [u,y,x],
        [u,u,x]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(true);
    expect(checkGridForMatches(y, grid)).toEqual(false);

    grid = [
        [x,y,x],
        [u,y,u],
        [u,y,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(false);
    expect(checkGridForMatches(y, grid)).toEqual(true);

    //matches diagonals
    grid = [
        [x,u,y],
        [u,y,x],
        [y,u,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(false);
    expect(checkGridForMatches(y, grid)).toEqual(true);

    grid = [
        [x,y,x],
        [u,x,u],
        [y,u,x]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(true);
    expect(checkGridForMatches(y, grid)).toEqual(false);

    //doesnt match when no row, column or diagonal exists
    grid = [
        [x,u,x],
        [u,y,u],
        [u,u,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(false);
    expect(checkGridForMatches(y, grid)).toEqual(false);

    grid = [
        [u,u,u],
        [u,u,u],
        [u,u,u]
    ]
    expect(checkGridForMatches(x, grid)).toEqual(false);
    expect(checkGridForMatches(y, grid)).toEqual(false);
})

test('proof that ai always wins or gets stalemate', () => {
    expect(playerCanWinAgainstAi()).toBe(false)
})

function playerCanWinAgainstAi () {
    //proven by playing all possible games
    let grid = [
        [u,u,u],
        [u,u,u],
        [u,u,u]
    ]
    let aiToken = 'ai'
    let playerToken = 'player'
    let aiStarts = aiTakesFirstTurn();
    let aiGoesSecond = aiTakesSecondTurn();

    return aiStarts || aiGoesSecond;

    function aiTakesFirstTurn () {
        let move = ai.chooseMove(grid);
        let nextGrid = newMoveWithGrid(aiToken, move, grid);

        return playAllPossibleMoves(nextGrid);
    }

    function aiTakesSecondTurn () {
        return playAllPossibleMoves(grid);
    }

    function playAllPossibleMoves(grid) {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                if(!grid[i][j]){
                    let playerMove = newMoveWithGrid(playerToken, {x: j, y: i}, grid);
                    if (playerWins(playerMove)) return true;
                    let result = playAiTurn(playerMove);
                    if(result) return result;
                }
            }
        }
        return false
    }

    function playAiTurn (grid) {
        let move = ai.chooseMove(grid);
        let newGrid = newMoveWithGrid(aiToken, )
        if(playerWins(newGrid)) return true;
        return playAllPossibleMoves(newGrid);
    }

    function playerWins (grid) {
        return checkGridForMatches(playerToken, grid)
    }

    function newMoveWithGrid (player, move, grid) {
        let newGrid = duplicateGrid(grid);
        newGrid[move.y][move.x] = player
        return newGrid;
    }

    function duplicateGrid (grid) {
        return grid.map((row) => row.map((element) => element));
    }
}

function checkGridForMatches(value, grid) {
    return hasHorizontalMatchingValues() ||
        hasVerticalMatchingValues() ||
        hasDiagonalMatchingValues()


    function hasHorizontalMatchingValues() {
        for (let i = 0; i < grid.length; i++){
            if(grid[i].every((element) => element === value) ) return true;
        }
        return false;
    }

    function hasVerticalMatchingValues () {
        let rotatedGrid = columnsAsRows(grid);
        for (let i = 0; i < rotatedGrid.length; i++){
            if(rotatedGrid[i].every((element) => element === value) ) return true;
        }
        return false;

        function columnsAsRows(grid) {
            let rotGrid = []
            for(let i = 0; i < grid[0].length; i++) {
                rotGrid.push(grid.map((row) => row[i]))
            }
            return rotGrid;
        }
    }

    function hasDiagonalMatchingValues () {
        let topLeftToBottomRight = [grid[0][0], grid[1][1], grid[2][2]];
        let bottomLeftToTopRight = [grid[2][0], grid[1][1], grid[0][2]];
        return topLeftToBottomRight.every((element) => element === value) ||
            bottomLeftToTopRight.every((element) => element === value)
    }
}