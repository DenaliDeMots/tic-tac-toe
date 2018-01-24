import reducer from './reducer';
import INITIAL_STATE from './initialState';
import {updateGameBoardAction} from '../Actions/actions'

test('the update game board action updates the gameboard field in the state', () => {
    const newGameBoard = [
        [1,0,0],
        [0,0,1],
        [0,1,0]
    ]
    const action = updateGameBoardAction(newGameBoard)
    expect(reducer(undefined, action).gameBoard).toEqual(newGameBoard);
})