import ticTacToe from '../../../ticTacToe';
import ai from '../../../ai/ticTacToe_HardAi';
import {
    startGame,
    gameOver,
    setPlayer
} from '../Actions/actions';
import store from './store';
import INITIAL_STATE from '../Reducer/initialState';

function makeGameController ({player1, player2}) {
    let gameType;
    let currentPlayer = player1;
    let moveResult;

    player1.turnNotifier(onChangeTurn);

    function onChangeTurn(player) {
        currentPlayer = player.player;
        store.dispatch(setPlayer(player.currentTurn))
    }

    function dispatchMoveUpdate(){
        if(Array.isArray(moveResult)){
            store.dispatch(gameOver);
        } else if (moveResult === 'stalemate'){
            store.dispatch(gameOver);
        } else if (moveResult.slice(8) === 'placed token'){
            store.dispatch(changePlayer)
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
            currentPlayer.playMove(move)
        }
    }
    return publicMethods;
}

const gameController = makeGameController(ticTacToe.startTicTacToeGame('X', 'Y'));

export default gameController;