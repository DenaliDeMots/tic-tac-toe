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
    let computerPlayer = false;

    player1.turnNotifier(onChangeTurn);

    function onChangeTurn(player) {
        currentPlayer = player.player;
        store.dispatch(setPlayer(player.currentTurn))
    }

    function checkForGameOver(){
        if(Array.isArray(moveResult)){
            store.dispatch(gameOver);
        } else if (moveResult === 'stalemate'){
            store.dispatch(gameOver);
        }
    }

    function playAiMove() {
        if(!computerPlayer) return
        let {aiToken, humanToken} = computerPlayer === player1 ?
            {aiToken: 'X', humanToken: 'Y'} : {aiToken: 'Y', humanToken: 'X'}
        let board = player1.getCurrentGameState()
        let computerMove = ai.chooseMove(board, aiToken, humanToken)
        moveResult = computerPlayer.playMove(computerMove);
    }

    const publicMethods = {
        startSinglePlayerGame(humanPlayer){
            computerPlayer = humanPlayer === 'player 2' ? player1 : player2;
            gameType = '1PlayerGame';
            store.dispatch(startGame);
            if(computerPlayer === player1) playAiMove()
        },

        start2PlayerGame() {
            gameType = '2PlayerGame'
            store.dispatch(startGame);
        },

        playMove(move){
            moveResult = currentPlayer.playMove(move)
            playAiMove()
            checkForGameOver()
        }
    }
    return publicMethods;
}

function newGame(){
    return makeGameController(ticTacToe.startTicTacToeGame('X', 'Y'));
}

export default newGame;