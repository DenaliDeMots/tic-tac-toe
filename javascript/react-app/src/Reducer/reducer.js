import INITIAL_STATE from './initialState';
import initialState from './initialState';
import startGame from './SubReducers/startGame'
import { gameOver } from '../Actions/actions';

function reducer (previousState = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_GAMEBOARD':
            return {
                ...previousState,
                gameBoard: action.gameBoard
            }
        
        case 'CHANGE_PLAYER':
            return {
                ...previousState,
                player: previousState.player === 'player1' ?
                    'player2' : 'player1'
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

export default reducer;