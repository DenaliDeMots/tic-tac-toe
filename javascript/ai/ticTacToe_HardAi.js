/* Ai for playing tic tac toe games.  It is a hard difficulty
level which means that it cannot be beaten.

Strategy:
Rule 1) If a winning move is available, take it!

Rule 2) If available always pick the center square as your first move.
If the center is unavailable pick a corner (top left by convention)

Rule 3) if your opponent has an impending match you must block it

Rule 4) if no impending match exists, pick a space that gives you
an impending match and, if available, an additional potential match.
*/

function chooseMove (gameState, aiToken, opponentToken) {
    let openingMove = findOpeningMove();
    let winningMove = findWinningMove()
    let requiredBlockingMove = findImpendingMatches();
    let createImpendingWin = createImpendingWin()
    return
        openingMove ? openingMove :
            winningMove ? winningMove :
                requiredBlockingMove ? requiredBlockingMove :
                    createImpendingWin;
    

    function findOpeningMove () {
        //check to see if the board is empty
    }

    function findWinningMove () {
        //check to see if any winning moves are available
    }

    function findImpendingMatches () {
        //check the board to see if opponent can win on next turn
    }
    
    function createImpendingWin () {
        //place a move that creates an impending win and if possible
        //an additional potential match
    }
}

