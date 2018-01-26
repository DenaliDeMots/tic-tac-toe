import ticTacToe from '../../../ticTacToe';
import ai from '../../../ai/ticTacToe_HardAi';
import {
    startGame,
    gameOver
} from '../Actions/actions';
import store from './store';
import INITIAL_STATE from '../Reducer/initialState';

function makeGameController ({player1, player2}) {
    let gameType;
    let currentPlayer = INITIAL_STATE.player;
    let moveResult;

    function dispatchMoveUpdate(){
        if(Array.isArray(moveResult)){
            store.dispatch(gameOver);
        } else if (moveResult === 'stalemate'){
            store.dispatch(gameOver);
        }
    }

    const publicMethods = {
        startSinglePlayerGame(){
            gameType = '1PlayerGame';
            store.dispatch(startGame);
        },

        start2PlayerGame() {
            gameType = '2PlayerGame'
            store.dispatch(startGame);
        },

        playMove(move){
            if(currentPlayer === 'player1'){
                moveResult = player1.playMove(move)
                dispatchMoveUpdate()
            } else if (currentPlayer === 'player2') {
                moveResult = player2.playMove(move)
                dispatchMoveUpdate()
            }
        }
    }
    return publicMethods;
}

const gameController = makeGameController(ticTacToe.startTicTacToeGame('X', 'Y'));

export default gameController;