'use strict';

var ticTacToe = require('tic-tac-toe/lib/ticTacToe');
var ai = require('tic-tac-toe/lib/ai/ticTacToe_HardAi');

var _require = require('../actions/actions'),
    startGame = _require.startGame,
    gameOver = _require.gameOver,
    setPlayer = _require.setPlayer,
    updateGameBoard = _require.updateGameBoard,
    setWinner = _require.setWinner,
    reset = _require.reset;

function makeGameController(_ref, store) {
    var player1 = _ref.player1,
        player2 = _ref.player2;

    var gameType = void 0;
    var currentPlayer = player1;
    var moveResult = void 0;
    var computerPlayer = false;

    player1.turnNotifier(onChangeTurn);

    function onChangeTurn(player) {
        currentPlayer = player.player === 'X' ? player1 : player2;
        store.dispatch(setPlayer(player.currentTurn));
    }

    function startNewGame() {
        store.dispatch(startGame);
        store.dispatch(setPlayer('player 1'));
        store.dispatch(setWinner(false));
        updateGameBoardState();
    }

    function updateGameBoardState() {
        var currentGameBoard = player1.getCurrentGameState();
        store.dispatch(updateGameBoard(currentGameBoard));
    }

    function checkForGameOver() {
        if (Array.isArray(moveResult)) {
            store.dispatch(gameOver);
            var winnner = getWinner();
            store.dispatch(setWinner(winnner));
        } else if (moveResult === 'stalemate') {
            store.dispatch(gameOver);
        }

        function getWinner() {
            var firstMatch = moveResult[0];
            var board = player1.getCurrentGameState();
            var winningToken = verticalMatch() || horizontalMatch() || diagonalMatch();
            return winningToken === 'X' ? 'player 1' : 'player 2';

            function verticalMatch() {
                if (firstMatch.matchType !== 'vertical match') return false;
                var columnIndex = firstMatch.columnIndex;
                return board[0][columnIndex];
            }

            function horizontalMatch() {
                if (firstMatch.matchType !== 'horizontal match') return false;
                var rowIndex = firstMatch.rowIndex;
                return board[rowIndex][0];
            }

            function diagonalMatch() {
                if (firstMatch.matchType !== 'diagonal match') return false;
                var startCorner = firstMatch.startCorner;
                return startCorner === 'top left' ? board[0][0] : board[2][0];
            }
        }
    }

    function playAiMove() {
        if (!computerPlayer) return;

        var _ref2 = computerPlayer === player1 ? { aiToken: 'X', humanToken: 'O' } : { aiToken: 'O', humanToken: 'X' },
            aiToken = _ref2.aiToken,
            humanToken = _ref2.humanToken;

        var board = player1.getCurrentGameState();
        var computerMove = ai.chooseMove(board, aiToken, humanToken);
        moveResult = computerPlayer.playMove(computerMove);
        updateGameBoardState();
        checkForGameOver();
    }

    var publicMethods = {
        startSinglePlayerGame: function startSinglePlayerGame(humanPlayer) {
            computerPlayer = humanPlayer === 'player 2' ? player1 : player2;
            gameType = '1PlayerGame';
            startNewGame();
            if (computerPlayer === player1) playAiMove();
        },
        start2PlayerGame: function start2PlayerGame() {
            gameType = '2PlayerGame';
            startNewGame();
        },
        playMove: function playMove(move) {
            moveResult = currentPlayer.playMove(move);
            updateGameBoardState();
            playAiMove();
            checkForGameOver();
        }
    };
    return publicMethods;
}

function newGame(store) {
    store.dispatch(reset);
    return makeGameController(ticTacToe.startTicTacToeGame('X', 'O'), store);
}

module.exports = newGame;