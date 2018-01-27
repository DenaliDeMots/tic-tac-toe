import reducer from './reducer';
import INITIAL_STATE from './initialState';
import {
    updateGameBoardAction,
    changePlayer,
    startGame,
    gameOver
} from '../Actions/actions'
import initialState from './initialState';

test('the update game board action updates the gameboard field in the state', () => {
    const newGameBoard = [
        [1,0,0],
        [0,0,1],
        [0,1,0]
    ]
    const action = updateGameBoardAction(newGameBoard)
    expect(reducer(undefined, action).gameBoard).toEqual(newGameBoard);
})

test('the change player action toggles between player 1 and 2', () => {
    let currentPlayer = INITIAL_STATE.player;
    let nextState = reducer(undefined, changePlayer);
    expect(nextState.player).toBe('player 2');
    nextState = reducer(nextState, changePlayer);
    expect(nextState.player).toBe('player 1');
    expect(nextState).toEqual(INITIAL_STATE)
})

test('sessionState toggles between startMenu, gameInProgress, and gameOver', () => {
    expect(INITIAL_STATE.sessionState).toBe('startMenu');
    let nextState = reducer(INITIAL_STATE, startGame);
    expect(nextState.sessionState).toBe('gameInProgress');
    nextState = reducer(nextState, gameOver);
    expect(nextState.sessionState).toBe('gameOver');
    nextState = reducer(nextState, startGame);
    expect(nextState.sessionState).toBe('startMenu');
    nextState = reducer(nextState, startGame);
    expect(nextState.sessionState).toBe('gameInProgress');
    nextState = reducer(nextState, startGame);
    expect(nextState.sessionState).toBe('startMenu');
    nextState = reducer(nextState, gameOver);
    expect(nextState.sessionState).toBe('gameOver');
})