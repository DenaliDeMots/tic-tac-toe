/* Generator function for creating session controller objects
manages game session activities like adding players,
starting the game, tracking who's turn it is and only
allowing players to place a move when it is their turn.
Constructed with an object that handles the game rules
and the number of players.
*/

const deepFreeze = require('deep-freeze')

//messages emitted by session controller objects
const playerAdded = 'player added';
const cantAddPlayer = 'cannot add additional players';
const startingGame = 'starting game';
const notEnoughPlayers = 'not enough players';
const alreadyStarted = 'game already started';
const notYourTurn = 'not your turn'

const messages = {
    addPlayer: {
        playerAdded,
        cantAddPlayer,
        alreadyStarted
    },
    startGame:{
        startingGame,
        notEnoughPlayers,
        alreadyStarted
    },
    placeMove:{
        notYourTurn
    }
}
deepFreeze(messages);

function newSessionController(game, numberOfPlayers) {
    if(numberOfPlayers < 1) numberOfPlayers = 1;
    let players = [];
    let gameHasStarted = false;
    let currentPlayerTurn

    function changeTurn() {
        let playerIndex = players.indexOf(currentPlayerTurn);
        playerIndex = playerIndex === players.length - 1 ?
            0 : playerIndex + 1;
        currentPlayerTurn = players[playerIndex]
    }

    let publicMethods = {
        addPlayer(player) {
            if(gameHasStarted) return alreadyStarted;
            if(players.length < numberOfPlayers){
                players.push(player);
                return playerAdded;
            } else {
                return cantAddPlayer;
            }
        },

        startGame(){
            if(gameHasStarted) return alreadyStarted;
            if(players.length === numberOfPlayers){
                gameHasStarted = true;
                currentPlayerTurn = players[0]
                return startingGame
            }
            return notEnoughPlayers;
        },

        placeMove(move, player){
            if(player !== currentPlayerTurn) return notYourTurn;
            let result = game.play(move);
            if (game.isValidMove(result)) changeTurn();
            return result;
        },

        getCurrentTurn() {
            return currentPlayerTurn;
        }
    }
    return publicMethods;
}

exports.newSessionController = newSessionController;
exports.messages = messages;