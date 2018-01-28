import newGame from './gameController';
import store from './store';



test('single player game defaults to the human as player 1', () => {
    const game = newGame(store)
    game.startSinglePlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');  
})

test('setting the human player to player 2 causes the ai to play the first move', () => {
    const game = newGame(store)
    game.startSinglePlayerGame('player 2');
    let newState = store.getState();
    expect(newState.player).toBe('player 2');
})


test('start 2 player game begins the game', () =>{
    const game = newGame(store)
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
    let game = newGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 1, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 2, y: 0})
    let state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','X'],
        ['Y','Y',undefined],
        [undefined, undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 1')
    //vertical match win
    game = newGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0})
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 2})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','Y',undefined],
        ['X','Y',undefined],
        ['X', undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 1')
    //diagonal match winner - top left
    game = newGame(store);
    game.start2PlayerGame()
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 0})
    game.playMove({x: 2, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 2, y: 2})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['Y','X','X'],
        ['X','Y',undefined],
        [undefined, undefined, 'Y']
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 2')
    //diagonal match winner - bottom left
    game = newGame(store);
    game.start2PlayerGame()
    game.playMove({x: 1, y: 0})
    game.playMove({x: 0, y: 2})
    game.playMove({x: 0, y: 0})
    game.playMove({x: 1, y: 1})
    game.playMove({x: 0, y: 1})
    game.playMove({x: 2, y: 0})
    state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','Y'],
        ['X','Y',undefined],
        ['Y', undefined, undefined]
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe('player 2')
})

test('game ends on stalemate', () => {
    const game = newGame(store);
    game.start2PlayerGame()
    game.playMove({x: 0, y: 0}) // 'X'
    game.playMove({x: 1, y: 1}) // 'Y'
    game.playMove({x: 1, y: 0}) // 'X'
    game.playMove({x: 2, y: 0}) // 'Y'
    game.playMove({x: 0, y: 2}) // 'X'
    game.playMove({x: 0, y: 1}) // 'Y'
    game.playMove({x: 2, y: 1}) // 'X'
    game.playMove({x: 2, y: 2}) // 'Y'
    game.playMove({x: 1, y: 2}) // 'X'

    let state = store.getState()
    expect(state.gameBoard).toEqual([
        ['X','X','Y'],
        ['Y','Y','X'],
        ['X','X','Y']
    ])
    expect(state.sessionState).toBe('gameOver')
    expect(state.winner).toBe(false)
})