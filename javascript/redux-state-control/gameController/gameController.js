const ticTacToe = require('tic-tac-toe/ticTacToe');
const ai = require('tic-tac-toe/ai/ticTacToe_HardAi');
let {
    startGame,
    gameOver,
    setPlayer,
    updateGameBoard,
    setWinner
} = require('../actions/actions');

function makeGameController ({player1, player2}, store) {
    let gameType;
    let currentPlayer = player1;
    let moveResult;
    let computerPlayer = false;

    player1.turnNotifier(onChangeTurn);

    function onChangeTurn(player) {
        currentPlayer = player.player === 'X' ? player1 : player2;
        store.dispatch(setPlayer(player.currentTurn))
    }

    function startNewGame() {
        store.dispatch(startGame);
        store.dispatch(setPlayer('player 1'));
        store.dispatch(setWinner(false));
        updateGameBoardState();
    }

    function updateGameBoardState() {
        let currentGameBoard = player1.getCurrentGameState();
        store.dispatch(updateGameBoard(currentGameBoard));
    }

    function checkForGameOver(){
        if(Array.isArray(moveResult)){
            store.dispatch(gameOver);
            let winnner = getWinner()
            store.dispatch(setWinner(winnner))
        } else if (moveResult === 'stalemate'){
            store.dispatch(gameOver);
        }

        function getWinner() {
            let firstMatch = moveResult[0];
            let board = player1.getCurrentGameState()
            let winningToken = verticalMatch() || horizontalMatch() || diagonalMatch()
            return winningToken === 'X' ? 'player 1' : 'player 2'

            function verticalMatch() {
                if(firstMatch.matchType !== 'vertical match') return false;
                let columnIndex = firstMatch.columnIndex;
                return board[0][columnIndex]
            }

            function horizontalMatch() {
                if(firstMatch.matchType !== 'horizontal match') return false;
                let rowIndex = firstMatch.rowIndex;
                return board[rowIndex][0]
            }

            function diagonalMatch() {
                if(firstMatch.matchType !== 'diagonal match') return false;
                let startCorner = firstMatch.startCorner;
                return startCorner === 'top left' ? board[0][0] : board[2][0]
            }
        }
    }

    function playAiMove() {
        if(!computerPlayer) return
        let {aiToken, humanToken} = computerPlayer === player1 ?
            {aiToken: 'X', humanToken: 'O'} : {aiToken: 'O', humanToken: 'X'}
        let board = player1.getCurrentGameState()
        let computerMove = ai.chooseMove(board, aiToken, humanToken)
        moveResult = computerPlayer.playMove(computerMove);
        checkForGameOver()
    }

    const publicMethods = {
        startSinglePlayerGame(humanPlayer){
            computerPlayer = humanPlayer === 'player 2' ? player1 : player2;
            gameType = '1PlayerGame';
            startNewGame()
            if(computerPlayer === player1) playAiMove()
        },

        start2PlayerGame() {
            gameType = '2PlayerGame'
            startNewGame()
        },

        playMove(move){
            moveResult = currentPlayer.playMove(move)
            updateGameBoardState()
            playAiMove()
            checkForGameOver()
        }
    }
    return publicMethods;
}

function newGame(store){
    return makeGameController(ticTacToe.startTicTacToeGame('X', 'O'), store);
}

module.exports = newGame;