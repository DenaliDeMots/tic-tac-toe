'use strict';

var grid = require('./grid');
var deepFreeze = require('deep-freeze');

//messages recieved from grid object
var valueAdded = grid.messages.setValueAt.valueAdded;
var outOfBounds = grid.messages.setValueAt.coordinatesOutOfBounds;
var alreadyUsed = grid.messages.setValueAt.coordinatesAlreadyUsed;
var matchMessages = grid.messages.matchMessages;

//messages emitted by tic tac toe game object
var player1 = 'player1';
var player2 = 'player2';
var player1PlacedToken = 'player1 placed token';
var player2PlacedToken = 'player2 placed token';
var stalemate = 'stalemate';

var messages = {
    players: {
        player1: player1,
        player2: player2
    },
    placeToken: {
        player1PlacedToken: player1PlacedToken,
        player2PlacedToken: player2PlacedToken
    },
    placeTokenError: {
        outOfBounds: outOfBounds,
        alreadyUsed: alreadyUsed
    },
    winMessages: {
        matchMessages: matchMessages,
        stalemate: stalemate
    }

};
deepFreeze(messages);

//object representing the rules of a Tic Tac Toe game
function newTicTacToeGame(player1Token, player2Token) {
    if (!player1Token) player1Token = 'X';
    if (!player2Token) player2Token = 'Y';

    var gameBoard = grid.makeGrid(3, 3);

    var turn = player1;
    var winnerMessage = false;

    function changeTurn() {
        turn = turn === player1 ? player2 : player1;
    }

    function currentToken() {
        return turn === player1 ? player1Token : player2Token;
    }

    function checkForWin() {
        var matchResults = checkForMatchingRowsColunmsOrDiagonals();
        if (gameBoard.isGridFull() && matchResults.length === 0) return stalemate;
        return matchResults.length > 0 ? matchResults : false;

        function checkForMatchingRowsColunmsOrDiagonals() {
            var horizontalMatches = gameBoard.getHorizontalMatchingValues();
            var verticalMatches = gameBoard.getVerticalMatchingValues();
            var diagonalMatches = gameBoard.getDiagonalMatchingValues();
            return horizontalMatches.concat(verticalMatches, diagonalMatches);
        }
    }

    var publicMethods = {
        getCurrentGameState: function getCurrentGameState() {
            //returns a 2d array representing the game
            return gameBoard.gridStateAs2dArray();
        },
        getCurrentTurn: function getCurrentTurn() {
            return turn;
        },
        placeToken: function placeToken(xCoordinate, yCoordinate) {
            if (winnerMessage) return winnerMessage;
            var didPlaceToken = gameBoard.setValueAt(currentToken(), xCoordinate, yCoordinate);
            return generateGameMessage();

            function generateGameMessage() {
                if (didPlaceToken === valueAdded) {
                    return placeTokenResult();
                } else {
                    return didPlaceToken;
                }
            }

            //helper functions
            function placeTokenResult() {
                winnerMessage = checkForWin();
                if (winnerMessage) return winnerMessage;
                changeTurn();
                return turn === player1 ? player2PlacedToken : player1PlacedToken;
            }
        },
        isAValidMoveMessage: function isAValidMoveMessage(message) {
            return message === player1PlacedToken || message === player2PlacedToken || message === stalemate || isWinMessage(message);

            function isWinMessage(message) {
                return Array.isArray(message) && message[0].hasOwnProperty('matchType');
            }
        }
    };

    return publicMethods;
}

exports.newTicTacToeGame = newTicTacToeGame;
exports.messages = messages;