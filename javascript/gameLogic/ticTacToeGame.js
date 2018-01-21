const grid = require('./grid');
const deepFreeze = require('deep-freeze');

const valueAdded = grid.messages.setValueAt.valueAdded;
const outOfBounds = grid.messages.setValueAt.coordinatesOutOfBounds;
const alreadyUsed = grid.messages.setValueAt.coordinatesAlreadyUsed;
const matchMessages = grid.messages.matchMessages;


const messages = {
    players: {
        player1: 'player1',
        player2: 'player2'
    },
    placeToken: {
        player1PlacedToken: 'player1 placed token',
        player2PlacedToken: 'player2 placed token'
    },
    placeTokenError: {
        outOfBounds,
        alreadyUsed
    },
    winMessages: {
        matchMessages,
        stalemate: 'stalemate'
    }

}
deepFreeze(messages)

const player1 = messages.players.player1;
const player2 = messages.players.player2;
const player1PlacedToken = messages.placeToken.player1PlacedToken;
const player2PlacedToken = messages.placeToken.player2PlacedToken;
const stalemate = messages.winMessages.stalemate;


//object representing the rules of a Tic Tac Toe game
function newTicTacToeGame(player1Token, player2Token) {
    if(!player1Token) player1Token = 'X';
    if(!player2Token) player2Token = 'Y';

    const gameBoard = grid.makeGrid(3, 3);

    let turn = player1;
    let winnerMessage = false;
    
    function changeTurn () {
        turn = turn === player1 ? player2 : player1
    }

    function currentToken() {
        return turn === player1 ? player1Token : player2Token
    }

    function checkForWin () {
        let matchResults = checkForMatchingRowsColunmsOrDiagonals();
        if(gameBoard.isGridFull() && matchResults.length === 0) return stalemate;
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
                if (didPlaceToken === valueAdded) {
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
                return turn === player1 ? player2PlacedToken : player1PlacedToken
            }
        }
    }

    return publicMethods;
}

exports.newTicTacToeGame = newTicTacToeGame;
exports.messages = messages;