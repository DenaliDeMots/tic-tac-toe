import gameController from './gameController';
import store from './store';


test('start single player game begins the game', () =>{
    gameController.startSinglePlayerGame();
    let newState = store.getState();
    expect(newState.player).toBe('player 1');
    gameController.playMove({x: 0, y: 0})
    newState = store.getState()
    expect(newState.player).toBe('player 2')
})