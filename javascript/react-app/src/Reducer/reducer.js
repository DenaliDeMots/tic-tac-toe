import INITIAL_STATE from './initialState';
import initialState from './initialState';
import startGame from './SubReducers/startGame'
import { gameOver } from '../Actions/actions';
import deepFreeze from 'deep-freeze';

function freezer (previousState = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_GAMEBOARD':
            return {
                ...previousState,
                gameBoard: action.gameBoard
            }
        
        case 'SET_PLAYER':
            return {
                ...previousState,
                player: action.player
            }
        
        case 'START_GAME':
            return {
                ...previousState,
                sessionState: startGame(previousState.sessionState)
            }

        case 'GAME_OVER':
            return {
                ...previousState,
                sessionState: 'gameOver'
            }
        default:
            return previousState;
    }
}

function reducer(previousState, action){
    const nextState = freezer(previousState, action);
    return deepFreeze(nextState);
}

export default reducer;