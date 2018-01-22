/* This module wires together the game rules object, session controller,
and player controller.  It creates an instance of the tic tac toe
game rules object and uses it to construct a session controller instance.
It then uses the session controller instance to create 2 player controllers.
Finally, it starts the game and returns the player controller objects.
*/

const gameType = require('./gameLogic/ticTacToeGame');
const sessionController = require('./controllers/sessionController');
const playerController = require('./controllers/playerController');

function startTicTacToeGame (player1Token, player2Token) {
    let ticTacToeGame = gameType.newTicTacToeGame(player1Token, player2Token)
    
    //set game methods needed by session controller
    ticTacToeGame.play = (move) =>{
        return ticTacToeGame.placeToken(move.x, move.y)
    }
    ticTacToeGame.isValidMove = ticTacToeGame.isAValidMoveMessage;

    let game = sessionController.newSessionController(ticTacToeGame, 2);
    let player1 = playerController.newPlayerController(game, player1Token);
    let player2 = playerController.newPlayerController(game, player2Token);
    game.startGame();
    return {
        player1,
        player2,
    }
}

exports.startTicTacToeGame = startTicTacToeGame