import reducer from './reducer';
import INITIAL_STATE from './initialState';
import {
    updateGameBoardAction,
    changePlayer
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
    expect(nextState.player).toBe('player2');
    nextState = reducer(nextState, changePlayer);
    expect(nextState.player).toBe('player1');
    expect(nextState).toEqual(INITIAL_STATE)
})