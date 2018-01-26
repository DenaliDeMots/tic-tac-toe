import ticTacToe from '../../../ticTacToe';
import ai from '../../../ai/ticTacToe_HardAi';
import {startGame} from '../Actions/actions';
import store from './store';
import INITIAL_STATE from '../Reducer/initialState';

function makeGameController ({player1, player2}) {
    let gameType;
    let currentPlaher = INITIAL_STATE.player;

    const publicMethods = {
        startSinglePlayerGame(){
            gameType = '1PlayerGame';
            store.dispatch(startGame);
        },

        start2PlayerGame() {
            gameType = '2PlayerGame'
            store.dispatch(startGame);
        }
    }
    return publicMethods;
}

const gameController = makeGameController(ticTacToe.startTicTacToeGame('X', 'Y'));

export default gameController;