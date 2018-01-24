import INITIAL_STATE from './initialState';
import initialState from './initialState';

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
        default:
            return previousState;
    }
}

export default reducer;