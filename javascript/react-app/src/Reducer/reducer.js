import INITIAL_STATE from './initialState';
import initialState from './initialState';

function reducer (previousState = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_GAMEBOARD':
            return {
                ...initialState,
                gameBoard: action.gameBoard
            }
        default:
            return previousState;
    }
}

export default reducer;