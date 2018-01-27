import newGame from './gameController';
import store from './store';



test('single player game defaults to the human as player 1', () => {
    const game = newGame()
    game.startSinglePlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');  
})

test('setting the human player to player 2 causes the ai to play the first move', () => {
    const game = newGame()
    game.startSinglePlayerGame('player 2');
    let newState = store.getState();
    expect(newState.player).toBe('player 2');
})


test('start 2 player game begins the game', () =>{
    const game = newGame()
    game.start2PlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');
    game.playMove({x: 0, y: 0})
    newState = store.getState()
    expect(newState.player).toBe('player 2')
})