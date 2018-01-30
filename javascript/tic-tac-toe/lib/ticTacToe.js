'use strict';

/* This module wires together the game rules object, session controller,
and player controller.  It creates an instance of the tic tac toe
game rules object and uses it to construct a session controller instance.
It then uses the session controller instance to create 2 player controllers.
Finally, it starts the game and returns the player controller objects.
*/

var gameType = require('./gameLogic/ticTacToeGame');
var sessionController = require('./controllers/sessionController');
var playerController = require('./controllers/playerController');

function startTicTacToeGame(player1Token, player2Token) {
    var ticTacToeGame = gameType.newTicTacToeGame(player1Token, player2Token);
    normalizeGameMethods();
    return createGame();

    function normalizeGameMethods() {
        //set game methods needed by session controller
        ticTacToeGame.play = function (move) {
            return ticTacToeGame.placeToken(move.x, move.y);
        };
        ticTacToeGame.isValidMove = ticTacToeGame.isAValidMoveMessage;
    }

    function createGame() {
        var game = sessionController.newSessionController(ticTacToeGame, 2);
        var playerControllers = createPlayerControllers();
        game.startGame();
        return playerControllers;

        function createPlayerControllers() {
            var player1 = playerController.newPlayerController(game, player1Token);
            var player2 = playerController.newPlayerController(game, player2Token);
            return {
                player1: player1,
                player2: player2
            };
        }
    }
}

exports.startTicTacToeGame = startTicTacToeGame;