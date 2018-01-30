'use strict';

/* Generator function for creating session controller objects
manages game session activities like adding players,
starting the game, tracking who's turn it is and only
allowing players to place a move when it is their turn.
Constructed with an object that handles the game rules
and the number of players.
*/

var deepFreeze = require('deep-freeze');

//messages emitted by session controller objects
var playerAdded = 'player added';
var cantAddPlayer = 'cannot add additional players';
var startingGame = 'starting game';
var notEnoughPlayers = 'not enough players';
var alreadyStarted = 'game already started';
var notYourTurn = 'not your turn';

var messages = {
    addPlayer: {
        playerAdded: playerAdded,
        cantAddPlayer: cantAddPlayer,
        alreadyStarted: alreadyStarted
    },
    startGame: {
        startingGame: startingGame,
        notEnoughPlayers: notEnoughPlayers,
        alreadyStarted: alreadyStarted
    },
    placeMove: {
        notYourTurn: notYourTurn
    }
};
deepFreeze(messages);

function newSessionController(game, numberOfPlayers) {
    if (numberOfPlayers < 1) numberOfPlayers = 1;
    var players = [];
    var gameHasStarted = false;
    var currentPlayerTurn = void 0;
    var changeTurnCallbacks = [];

    function changeTurn() {
        var playerIndex = players.indexOf(currentPlayerTurn);
        playerIndex = playerIndex === players.length - 1 ? 0 : playerIndex + 1;
        currentPlayerTurn = players[playerIndex];
        dispatchTurnChangeEvent();

        function dispatchTurnChangeEvent() {
            changeTurnCallbacks.map(function (callback) {
                if (typeof callback !== 'function') return;
                callback({
                    currentTurn: 'player ' + (playerIndex + 1),
                    player: players[playerIndex]
                });
            });
        }
    }

    var publicMethods = {
        addPlayer: function addPlayer(player) {
            if (gameHasStarted) return alreadyStarted;
            if (players.length < numberOfPlayers) {
                players.push(player);
                return playerAdded;
            } else {
                return cantAddPlayer;
            }
        },
        hasPlayer: function hasPlayer(player) {
            return players.includes(player);
        },
        startGame: function startGame() {
            if (gameHasStarted) return alreadyStarted;
            if (players.length === numberOfPlayers) {
                gameHasStarted = true;
                currentPlayerTurn = players[0];
                return startingGame;
            }
            return notEnoughPlayers;
        },
        placeMove: function placeMove(move, player) {
            if (player !== currentPlayerTurn) return notYourTurn;
            var result = game.play(move);
            if (game.isValidMove(result)) changeTurn();
            return result;
        },
        getCurrentTurn: function getCurrentTurn() {
            return currentPlayerTurn;
        },
        getCurrentGameState: function getCurrentGameState() {
            return game.getCurrentGameState();
        },
        onTurnChange: function onTurnChange(callback) {
            changeTurnCallbacks.push(callback);
        }
    };
    return publicMethods;
}

exports.newSessionController = newSessionController;
exports.messages = messages;