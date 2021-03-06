/*Generator function for player controller objects.
Player controllers are contsructed using a game session object
and a player identifier.  The intended uses is to create a 
player controller for each player in a game using the same
game session object to construct each player controller.
*/

function newPlayerController(gameSession, playerId) {
    let addPlayerMessage = gameSession.addPlayer(playerId);

    const publicMethods = {
        playMove(moveData) {
                return gameSession.placeMove(moveData, playerId);
        },

        turnNotifier(callback) {
            gameSession.onTurnChange(callback)
        },

        getCurrentGameState(){
            return gameSession.getCurrentGameState();
        }
    }
    //only return a player controller object if the player was successfully added to the session
    //otherwise return the error message generated by the game session controller
    if(gameSession.hasPlayer(playerId)){
        return publicMethods;
    } else {
        return addPlayerMessage;
    }
}

exports.newPlayerController = newPlayerController