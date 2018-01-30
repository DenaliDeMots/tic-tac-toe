const newGame = require('./gameController');
const store = require('../store/store');

let createNewGame = newGame;


test('single player game defaults to the human as player 1', () => {
    const game = createNewGame(store)
    game.startSinglePlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');  
})

test('setting the human player to player 2 causes the ai to play the first move', () => {
    const game = createNewGame(store)
    game.startSinglePlayerGame('player 2');
    let newState = store.getState();
    expect(newState.player).toBe('player 2');
})


test('start 2 player game begins the game', () =>{
    const game = createNewGame(store)
    game.start2PlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');
    game.playMove({x: 0, y: 0})
    newState = store.getState()
    expect(newState.player).toBe('player 2')
    game.playMove({x: 1, y: 0})
    newState = store.getState()
    expect(newState.player).toBe('player 1');
})

test('game ends on win', () => {
    //horizontal match win
    let game = createNewGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 1, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 2, y: 0})
    let state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','X'],
        ['O','O',undefined],
        [undefined, undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 1')
    //vertical match win
    game = createNewGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0})
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 2})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','O',undefined],
        ['X','O',undefined],
        ['X', undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 1')
    //diagonal match winner - top left
    game = createNewGame(store);
    game.start2PlayerGame()
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 0})
    game.playMove({x: 2, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 2, y: 2})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['O','X','X'],
        ['X','O',undefined],
        [undefined, undefined, 'O']
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 2')
    //diagonal match winner - bottom left
    game = createNewGame(store);
    game.start2PlayerGame()
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 2})
    game.playMove({x: 0, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 2, y: 0})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','O'],
        ['X','O',undefined],
        ['O', undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 2')
})

test('game ends on stalemate', () => {
    const game = createNewGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0}) // 'X'
    game.playMove({x: 1, y: 1}) // 'O'
    game.playMove({x: 1, y: 0}) // 'X'
    game.playMove({x: 2, y: 0}) // 'O'
    game.playMove({x: 0, y: 2}) // 'X'
    game.playMove({x: 0, y: 1}) // 'O'
    game.playMove({x: 2, y: 1}) // 'X'
    game.playMove({x: 2, y: 2}) // 'O'
    game.playMove({x: 1, y: 2}) // 'X'

    let state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','O'],
        ['O','O','X'],
        ['X','X','O']
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe(false)
})

test('ai plays moves in single player game', () => {
    let game = createNewGame(store);
    game.startSinglePlayerGame('player 1')
    game.playMove({x: 0, y: 0})
    let state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X',undefined,undefined],
        [undefined,'O',undefined],
        [undefined,undefined,undefined]
    ])
    expect(state.player).toBe('player 1')
    //human player set to player 2
    game = createNewGame(store);
    game.startSinglePlayerGame('player 2')
    state = store.getState()
    expect(state.player).toBe('player 2')
    expect(state.gameBoard).toEqual([
        ['X',undefined,undefined],
        [undefined,undefined,undefined],
        [undefined,undefined,undefined]
    ])
    game.playMove({x: 1, y: 1})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X',undefined,undefined],
        [undefined,'O',undefined],
        [undefined,undefined,'X']
    ])
    expect(state.player).toBe('player 2')
})

function replaceGameController (newGameController) {
    createNewGame = newGameController;
}

module.exports = replaceGameController;