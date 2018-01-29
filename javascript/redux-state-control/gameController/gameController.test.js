const newGame = require('./gameController');
const reducer = require('../reducer/reducer');
const {createStore} = require('redux');

function newStore() {
    return createStore(reducer)
}

let createNewGame = newGame;


test('single player game defaults to the human as player 1', () => {
    const store = newStore()
    const game = createNewGame(store)
    game.startSinglePlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');  
})

test('setting the human player to player 2 causes the ai to play the first move', () => {
    const store = newStore()
    const game = createNewGame(store)
    game.startSinglePlayerGame('player 2');
    let newState = store.getState();
    expect(newState.player).toBe('player 2');
})


test('start 2 player game begins the game', () =>{
    const store = newStore()
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
    let store = newStore()
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
    store = newStore()
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
    store = newStore()
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
    store = newStore()
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
    const store = newStore()
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

function replaceGameController (newGameController) {
    createNewGame = newGameController;
}

module.exports = replaceGameController;