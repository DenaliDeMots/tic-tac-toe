const grid = require('./grid');

//object representing the rules of a Tic Tac Toe game
function newTicTacToeGame(player1Token, player2Token) {
    if(!player1Token) player1Token = 'X';
    if(!player2Token) player2Token = 'Y';

    const gameBoard = grid.makeGrid(3, 3);

    let turn = 'player1';
    let winner = false;

    
    let publicMethods = {
        getCurrentGameState(){
            //returns a 2d array representing the game
            return gameBoard.gridStateAs2dArray();
        },

        getCurrentTurn() {
            return turn;
        },
        
    }

    return publicMethods;
}

exports.newTicTacToeGame = newTicTacToeGame;