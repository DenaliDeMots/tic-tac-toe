let gameBoard = require('./grid');
let makeGrid = gameBoard.makeGrid;

test('grid sets and retrieves values', () => {
    let grid = makeGrid(3, 3);
    let value = 'X'
    let message = grid.setValueAt(value, 0, 0);
    expect(message).toBe('value added');
    let retrieved = grid.valueAt(0, 0);
    expect(retrieved).toBe(value)
})

test('grid does not set out of bound values', () => {
    let grid = makeGrid(3, 3);
    let value = 'X'
    let message = grid.setValueAt(value, 5, 0);
    expect(message).toBe('out of bounds');
    let retrieved = grid.valueAt(5, 0);
    expect(retrieved).toBe(undefined);
})

test('grid does not allow overwriting values', () => {
    let grid = makeGrid(3, 3);
    grid.setValueAt('X', 0, 0);
    let message = grid.setValueAt('Y', 0, 0);
    expect(message).toBe('coordinates already used')
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
        matchType: 'horizontal match',
        value: 'X',
        rowIndex: 0
    };
    //complete rows return only the expected match object
    expect(matches.length).toBe(1);
    expect(matches[0]).toEqual(expectedMatchValue1);
    grid.setValueAt('Y', 0, 1);
    grid.setValueAt('Y', 1, 1);
    grid.setValueAt('Y', 2, 1);
    matches = grid.getHorizontalMatchingValues();
    let expectedMatchValue2 = {
        matchType: 'horizontal match',
        value: 'Y',
        rowIndex: 1
    };
    //multiple complete rows each return the expected match object
    expect(matches.length).toBe(2);
    expect(matches[0]).toEqual(expectedMatchValue1);
    expect(matches[1]).toEqual(expectedMatchValue2);
})

test('gridStateAs2dArray() returns a 2d array with the set values', () => {
    let grid = makeGrid(3, 3);
    let value = {key: "value"};
    grid.setValueAt(value, 0, 0);
    let state = grid.gridStateAs2dArray();
    expect(state[0][0]).toBe(value);
})