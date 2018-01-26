let ai = require('./ticTacToe_HardAi')

const x = 'X';
const y = 'Y';
const u = undefined;

test('impendingMatchLocations finds impending matches', () => {
    //find rows
    let grid = [
        [x,u,x],
        [u,y,u],
        [u,u,u]
    ]
    let expectedCoordinates = [{
            x: 1,
            y: 0
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
    grid = [
        [x,u,u],
        [u,y,y],
        [u,u,u]
    ]
    expectedCoordinates = [{
            x: 0,
            y: 1
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(expectedCoordinates)
    grid = [
        [x,u,u],
        [u,y,u],
        [x,x,u]
    ]
    expectedCoordinates = [{
            x: 2,
            y: 2
        }, {x: 0, y: 1}]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)

    //find columns
    grid = [
        [x,u,u],
        [u,y,u],
        [x,u,u]
    ]
    expectedCoordinates = [{
            x: 0,
            y: 1
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
    grid = [
        [x,u,u],
        [u,y,x],
        [u,y,u]
    ]
    expectedCoordinates = [{
            x: 1,
            y: 0
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(expectedCoordinates)
    //find diagonals
    grid = [
        [x,u,u],
        [u,x,u],
        [u,y,u]
    ]
    expectedCoordinates = [{
            x: 2,
            y: 2
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
    grid = [
        [x,u,y],
        [u,y,u],
        [u,x,u]
    ]
    expectedCoordinates = [{
            x: 0,
            y: 2
        }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(expectedCoordinates)

    //no match for grids with no impending matches
    grid = [
        [x,u,u],
        [u,y,u],
        [u,x,u]
    ]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
    grid = [
        [u,x,u],
        [u,y,u],
        [u,y,u]
    ]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(false)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
    grid = [
        [x,x,u],
        [x,y,u],
        [x,y,u]
    ]
    expectedCoordinates = [{
        x: 2,
        y: 0
    }]
    expect(ai.impendingMatchLocations(grid, x)).toEqual(expectedCoordinates)
    expect(ai.impendingMatchLocations(grid, y)).toEqual(false)
})   

test('ai function plays correct opening moves', () => {
    //ai plays in top left corner on first move
    let a = 'ai';
    let p = 'player'
    let grid = [
        [u,u,u],
        [u,u,u],
        [u,u,u]
    ]
    let move = ai.chooseMove(grid, a, p)

    //on second move if opponent token is in corner, play center
    expect(move).toEqual({x: 0, y: 0})
    grid = [
        [p,u,u],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
    grid = [
        [u,u,p],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
    grid = [
        [u,u,u],
        [u,u,u],
        [p,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
    grid = [
        [u,u,u],
        [u,u,u],
        [u,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})

    //on the second move if the opponent is in the center play a corner
    grid = [
        [u,u,u],
        [u,p,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})

    //on second move if opponent is not in a corner
    //or center play an adjacent corner
    grid = [
        [u,u,u],
        [p,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})
    grid = [
        [u,p,u],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})
    grid = [
        [u,u,u],
        [u,u,p],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 2})
    grid = [
        [u,u,u],
        [u,u,u],
        [u,p,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 2})

    //on third move if opponent is in center play diagonal
    grid = [
        [a,u,u],
        [u,p,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 2})

    //on a third move if opponent is not in center play a
    //corner in a row or column that contains the first move
    //but not the opponent
    grid = [
        [a,p,u],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 2})
    grid = [
        [a,u,u],
        [p,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 0})
    grid = [
        [a,u,p],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 2})
    grid = [
        [a,u,u],
        [u,u,u],
        [u,p,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 0})

    //On a fourth move where the opponent is in a corner, you are in the center,
    //and there are no required blocking moves, play a side that creates an impending win
    grid = [
        [p,u,u],
        [u,a,u],
        [u,p,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 1})
    grid = [
        [p,u,u],
        [u,a,u],
        [u,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 0})
    grid = [
        [p,u,u],
        [u,a,p],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 0})
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
    grid = [
        [p,a,p],
        [u,a,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 2})
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
        [a,u,u],
        [u,p,u],
        [p,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 2, y: 0})
    grid = [
        [u,u,u],
        [u,p,u],
        [a,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 0})

})

test('ai creates double impending moves when possible', () => {
    let a = 'ai';
    let p = 'player'
    let u = undefined
    let grid = [
        [a,p,a],
        [u,u,p],
        [u,u,u]
    ]
    let move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
    grid = [
        [a,u,u],
        [p,u,p],
        [a,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
    grid = [
        [a,p,u],
        [u,a,u],
        [u,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 1})
    grid = [
        [a,p,a],
        [u,u,u],
        [u,u,u]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 1})
})

test('the ai blocks double impending losses', () => {
    let grid = [
        [y,x,u],
        [u,x,y],
        [u,y,u]
    ]
    let move = ai.chooseMove(grid, x, y)
    expect(move).toEqual({x: 0, y: 2})
})

test('ai plays random moves when no other options are available', () => {
    let a = 'ai';
    let p = 'player'
    let grid = [
        [a,a,p],
        [p,a,a],
        [u,p,p]
    ]
    let move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 0, y: 2})
    grid = [
        [a,u,p],
        [p,a,a],
        [a,p,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 0})
    grid = [
        [a,a,p],
        [p,p,a],
        [a,u,p]
    ]
    move = ai.chooseMove(grid, a, p)
    expect(move).toEqual({x: 1, y: 2})
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
    let startGrid = [
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
        let move = ai.chooseMove(startGrid, aiToken, playerToken);
        let nextGrid = newMoveWithGrid(aiToken, move, startGrid);
        return playAllPossiblePlayerMoves(nextGrid);
    }

    function aiTakesSecondTurn () {
        return playAllPossiblePlayerMoves(startGrid);
    }

    function playAllPossiblePlayerMoves(grid) {
        for(let i = 0; i < grid.length; i++) {
            for(let j = 0; j < grid[0].length; j++) {
                if(!(grid[i][j])){
                    let playerMove = newMoveWithGrid(playerToken, {x: j, y: i}, grid);
                    if (playerWins(playerMove)) {
                        return true;
                    }
                    let result = playAiTurn(playerMove);
                    if(result) return result;
                }
            }
        }
        return false
    }

    function playAiTurn (grid) {
        let move = ai.chooseMove(grid, aiToken, playerToken);
        if(!move) return false;
        let newGrid = newMoveWithGrid(aiToken, move, grid)
        if(aiWins(newGrid)){
            return false;
        }
        return playAllPossiblePlayerMoves(newGrid);
    }

    function playerWins (grid) {
        let hasMatches =  checkGridForMatches(playerToken, grid);
        if(hasMatches){
            return true;
        }
        return false;
    }

    function aiWins (grid) {
        let hasMatches = checkGridForMatches(aiToken, grid);
        if(hasMatches){
            return true;
        }
        return false;
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