const INITIAL_STATE = require('./initialState');
const deepFreeze = require('deep-freeze');

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
            return (
                previousState.sessionState === 'startMenu' ?
                    {
                    ...previousState,
                    sessionState: 'gameInProgress'
                    }
                    : previousState
            )

        case 'GAME_OVER':
            return (
                previousState.sessionState === 'gameInProgress' ? 
                    {
                    ...previousState,
                    sessionState: 'gameOver'
                    }
                    : previousState
            )

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

module.exports = reducer;