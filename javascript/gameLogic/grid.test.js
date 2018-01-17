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

test('gridStateAs2dArray() returns a 2d array with the set values', () => {
    let grid = makeGrid(3, 3);
    let value = {key: "value"};
    grid.setValueAt(value, 0, 0);
    let state = grid.gridStateAs2dArray();
    expect(state[0][0]).toBe(value);
})