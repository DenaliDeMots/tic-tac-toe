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
        [u,u,x],
        [u,y,u]
    ]
    expectedMatch = false
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)

    //find columns
    grid = [
        [x,u,u],
        [u,y,x],
        [u,y,u]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 1,
            y: 0
        },
        playerAboutToWin: y
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
    
    grid = [
        [x,u,u],
        [u,y,x],
        [x,u,y]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 0,
            y: 1
        },
        playerAboutToWin: x
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)

    grid = [
        [x,u,u],
        [u,u,x],
        [y,u,u]
    ]
    expectedMatch = false;
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)

    //find diagonals
    grid = [
        [x,u,u],
        [u,x,y],
        [u,y,u]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 2,
            y: 2
        },
        playerAboutToWin: x
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
    
    grid = [
        [x,u,u],
        [u,y,x],
        [y,u,u]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 2,
            y: 0
        },
        playerAboutToWin: y
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
    
    grid = [
        [x,u,u],
        [u,u,u],
        [y,u,x]
    ]
    expectedMatch = {
        unfilledCoordinates: {
            x: 1,
            y: 1
        },
        playerAboutToWin: x
    }
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)

    grid = [
        [x,u,u],
        [u,u,x],
        [y,u,u]
    ]
    expectedMatch = false;
    expect(ai.impendingMatchLocation(grid)).toEqual(expectedMatch)
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