let gameBoard = require('./grid');

let makeGrid = gameBoard.makeGrid;

const setValueMessages = gameBoard.messages.setValueAt;
const matchMessages = gameBoard.messages.matchMessages

const outOfBounds = setValueMessages.coordinatesOutOfBoundsl
const valueAdded = setValueMessages.valueAdded;
const alreadyUsed = setValueMessages.alreadyUsed;

const horizintalMatch = matchMessages.horizontalMatch.matchType;
const verticalMatch = matchMessages.verticalMatch.matchType;
const diagonalMatch = matchMessages.diagonalMatch.matchType;

const rowIndex = matchMessages.horizontalMatch.locationIdentifierKey;
const columnIndex = matchMessages.horizontalMatch.locationIdentifierKey;
const startCorner = matchMessages.diagonalMatch.locationIdentifierKey;

const topLeft = matchMessages.diagonalMatch.locations.topLeft;
const bottomLeft = matchMessages.diagonalMatch.locations.bottomLeft;

test('grid sets and retrieves values', () => {
    let grid = makeGrid(3, 3);
    let value = 'X'
    let message = grid.setValueAt(value, 0, 0);
    expect(message).toBe(valueAdded);
    let retrieved = grid.valueAt(0, 0);
    expect(retrieved).toBe(value)
})

test('grid does not set out of bound values', () => {
    let grid = makeGrid(3, 3);
    let value = 'X'
    let message = grid.setValueAt(value, 5, 0);
    expect(message).toBe(outOfBounds);
    let retrieved = grid.valueAt(5, 0);
    expect(retrieved).toBe(undefined);
})

test('grid does not allow overwriting values', () => {
    let grid = makeGrid(3, 3);
    grid.setValueAt('X', 0, 0);
    let message = grid.setValueAt('Y', 0, 0);
    expect(message).toBe(alreadyUsed)
    let value = grid.valueAt(0, 0);
    expect(value).toBe('X');
})

test('grid finds rows of matching values', () => {
    let grid = makeGrid(3, 3);
    grid.setValueAt('X', 0, 0);
    grid.setValueAt('X', 1, 0);
    let matches = grid.getHorizontalMatchingValues();
    //partialially complete rows dont return a match
    expect(matches).toEqual([])
    grid.setValueAt('X', 2, 0);
    matches = grid.getHorizontalMatchingValues();
    let expectedMatchValue1 = {
        matchType: horizintalMatch,
        value: 'X',
        [rowIndex]: 0
    };
    //complete rows return only the expected match object
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual(expectedMatchValue1);
    grid.setValueAt('Y', 0, 1);
    grid.setValueAt('Y', 1, 1);
    grid.setValueAt('Y', 2, 1);
    matches = grid.getHorizontalMatchingValues();
    let expectedMatchValue2 = {
        matchType: horizintalMatch,
        value: 'Y',
        [rowIndex]: 1
    };
    //multiple complete rows each return the expected match object
    expect(matches.length).toBe(2);
    expect(matches[0]).toEqual(expectedMatchValue1);
    expect(matches[1]).toEqual(expectedMatchValue2);
})

test('grid finds columns of matching values', () => {
    let grid = makeGrid(3, 3);
    grid.setValueAt('X', 0, 0);
    grid.setValueAt('X', 0, 1);
    let matches = grid.getVerticalMatchingValues()
    //partially complete columns dont return matches
    expect(matches).toEqual([]);
    grid.setValueAt('X', 0, 2);
    matches = grid.getVerticalMatchingValues();
    let expectedMatchValue1 = {
        matchType: verticalMatch,
        value: 'X',
        [columnIndex]: 0
    };
    //complete colunms return only the expected match object
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual(expectedMatchValue1);
    grid.setValueAt('Y', 1, 0);
    grid.setValueAt('Y', 1, 1);
    grid.setValueAt('Y', 1, 2);
    matches = grid.getVerticalMatchingValues();
    let expectedMatchValue2 = {
        matchType: verticalMatch,
        value: 'Y',
        [columnIndex]: 1
    }
    //multiple columns return the expected match objects
    expect(matches.length).toBe(2);
    expect(matches[0]).toEqual(expectedMatchValue1);
    expect(matches[1]).toEqual(expectedMatchValue2);
})

test('grid finds diagonals of matching values', () => {
    let grid = makeGrid(3, 3);
    //check matching from the top left
    grid.setValueAt('X', 0, 0)
    let matches = grid.getDiagonalMatchingValues()
    expect(matches).toEqual([])
    grid.setValueAt('X', 1, 1)
    matches = grid.getDiagonalMatchingValues();
    //incomplete diagonals don't return a match (test top left)
    expect(matches).toEqual([]);
    grid.setValueAt('X', 2, 2);
    matches = grid.getDiagonalMatchingValues();
    let expectedMatchValue1 = {
        matchType: diagonalMatch,
        value: 'X',
        [startCorner]: topLeft
    }
    //complete diagonals return only their corrosponding match object
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual(expectedMatchValue1)
    grid.setValueAt('X', 2, 0)
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual(expectedMatchValue1)
    grid.setValueAt('X', 0, 2)
    let expectedMatchValue2 = {
        matchType: diagonalMatch,
        value: 'X',
        [startCorner]: bottomLeft
    }
    matches = grid.getDiagonalMatchingValues()
    //multiple diagonals
    expect(matches.length).toBe(2);
    let topLeftMatch = matches.find((match) => match[startCorner] === topLeft);
    expect(topLeftMatch).toEqual(expectedMatchValue1);
    let bottomLeftMatch = matches.find((match) => match[startCorner] === bottomLeft);
    expect(bottomLeftMatch).toEqual(expectedMatchValue2)

    //incompete diagonals don't return a match (test bottom left)
    grid = makeGrid(3, 3);
    grid.setValueAt('X', 0, 2)
    grid.setValueAt('X', 1, 1)
    matches = grid.getDiagonalMatchingValues()
    expect(matches.length).toBe(0)
    //complete diagonals only return their corrosponding match
    grid.setValueAt('X', 2, 0)
    matches = grid.getDiagonalMatchingValues()
    expect(matches.length).toBe(1)
    expect(matches[0]).toEqual(expectedMatchValue2)


    //If a non square grid is required, add tests here to verify
    //matching from the right side corners
})

test('isGridFull() detects when the entire grid has truthy values', () => {
    let grid = makeGrid(3, 3)
    //expect false when totally empty
    expect(grid.isGridFull()).toBe(false);
    //expect false after 1 element is added
    grid.setValueAt('X', 0, 0);
    expect(grid.isGridFull()).toBe(false);
    //expect false after a horizintal row is added
    grid.setValueAt('X', 1, 0);
    grid.setValueAt('X', 2, 0);
    expect(grid.isGridFull()).toBe(false);
    //expect false after a vertical column is added
    grid.setValueAt('X', 0, 1);
    grid.setValueAt('X', 0, 2);
    expect(grid.isGridFull()).toBe(false);
    //expect false after a diagonal is added
    grid.setValueAt('X', 1, 1);
    grid.setValueAt('X', 2, 2);
    expect(grid.isGridFull()).toBe(false);
    //expect true only when the grid is full
    grid.setValueAt('X', 1, 2);
    grid.setValueAt('X', 2, 1);
    expect(grid.isGridFull()).toBe(true);
})

test('gridStateAs2dArray() returns a 2d array with the set values', () => {
    let grid = makeGrid(3, 3);
    let value = {key: "value"};
    grid.setValueAt(value, 0, 0);
    let state = grid.gridStateAs2dArray();
    expect(state[0][0]).toBe(value);
})