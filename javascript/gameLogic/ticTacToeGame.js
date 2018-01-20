const grid = require('./grid');

//object representing the rules of a Tic Tac Toe game
function newTicTacToeGame(player1Token, player2Token) {
    if(!player1Token) player1Token = 'X';
    if(!player2Token) player2Token = 'Y';

    const gameBoard = grid.makeGrid(3, 3);

    let turn = 'player1';
    let winnerMessage = false;
    
    function changeTurn () {
        turn = turn === 'player1' ? 'player2' : 'player1'
    }

    function currentToken() {
        return turn === 'player1' ? player1Token : player2Token
    }

    function checkForWin () {
        let matchResults = checkForMatchingRowsColunmsOrDiagonals();
        return matchResults.length > 0 ? matchResults : false;

        function checkForMatchingRowsColunmsOrDiagonals() {
            let horizontalMatches = gameBoard.getHorizontalMatchingValues();
            let verticalMatches = gameBoard.getVerticalMatchingValues();
            let diagonalMatches = gameBoard.getDiagonalMatchingValues();
            return horizontalMatches.concat(verticalMatches, diagonalMatches)
        }
    }
    
    let publicMethods = {
        getCurrentGameState(){
            //returns a 2d array representing the game
            return gameBoard.gridStateAs2dArray();
        },

        getCurrentTurn() {
            return turn;
        },
        
        placeToken(xCoordinate, yCoordinate) {
            if (winnerMessage) return winnerMessage;
            let didPlaceToken = gameBoard.setValueAt(currentToken(), xCoordinate, yCoordinate);
            return generateGameMessage()

            function generateGameMessage() {
                if (didPlaceToken === 'value added') {
                    return placeTokenResult()
                } else {
                    return didPlaceToken;
                }
            }
            
            //helper functions
            function placeTokenResult () {
                winnerMessage = checkForWin();
                if(winnerMessage) return winnerMessage;
                changeTurn();
                return turn === 'player1' ? 'player2 placed token' : 'player1 placed token'
            }
        }
    }

    return publicMethods;
}

exports.newTicTacToeGame = newTicTacToeGame;