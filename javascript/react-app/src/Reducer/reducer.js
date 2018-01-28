import INITIAL_STATE from './initialState';
import initialState from './initialState';
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
                sessionState: 'gameInProgress'
            }

        case 'GAME_OVER':
            return {
                ...previousState,
                sessionState: 'gameOver'
            }

        case 'SET_WINNER':
            return {
                ...previousState,
                winner: action.winner
            }
        
        case 'RESET':
            return INITIAL_STATE;

        default:
            return previousState;
    }
}

function reducer(previousState, action){
    const nextState = freezer(previousState, action);
    return deepFreeze(nextState);
}

export default reducer;