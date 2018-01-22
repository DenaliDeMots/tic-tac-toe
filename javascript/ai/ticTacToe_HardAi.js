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
    let bestAvailableMove = createImpendingWin()
    return openingMove || winningMove || requiredBlockingMove || bestAvailableMove;
    

    function findOpeningMove () {
        //check to see if the board is empty
    }

    function findWinningMove () {
        //check to see if any winning moves are available
        if(openingMove) return false;
    }

    function findImpendingMatches () {
        //check the board to see if opponent can win on next turn
        if(openingMove || winningMove) return false;
    }
    
    function createImpendingWin () {
        //place a move that creates an impending win and if possible
        //an additional potential match
        if(openingMove || winningMove || requiredBlockingMove) return false;
    }
}

function impendingMatchLocation(gameState) {
    let unfilledCoordinates = false;
    let playerAboutToWin = false;
    return find2TheSameAndOneEmpty() ?
        {   unfilledCoordinates,
            playerAboutToWin}
        : false

    function find2TheSameAndOneEmpty () {
        if (checkRows()) return true;
        if (checkColumns()) return true;
        if (checkDiagonals()) return true;
        return false;

        function twoSameAndOneEmpty (threeElementArry){
            //filter out falsey values
            let marks = threeElementArry.filter((mark) => !!mark)
            return marks.length === 2 && marks[0] === marks[1]
        }

        function checkRows () {
            let rows = gameState.map((row) => twoSameAndOneEmpty(row))
            let rowMatchIndex = rows.indexOf(true)
            if (rowMatchIndex === -1) return false;
            setCoordinatesAndPlayer();
            return true;

            function setCoordinatesAndPlayer () {
                let matchingRow = gameState[rowMatchIndex]
                let columnMatchIndex = matchingRow.map((e) => !!e).indexOf(false);
                unfilledCoordinates = {x: columnMatchIndex, y: rowMatchIndex}
                playerAboutToWin = matchingRow.filter((e) => !!e)[0]
            }
        }

        function checkColumns () {
            let rotatedGrid = columnsAsRows(gameState);
            let columns = rotatedGrid.map((column) => twoSameAndOneEmpty(column));
            let columnMatchIndex = columns.indexOf(true);
            if(columnMatchIndex === -1) return false;
            setCoordinatesAndPlayer();
            return true;

            function columnsAsRows(grid) {
                let rotGrid = []
                for(let i = 0; i < grid[0].length; i++) {
                    rotGrid.push(grid.map((row) => row[i]))
                }
                return rotGrid;
            }

            function setCoordinatesAndPlayer () {
                let matchingColumn = rotatedGrid[columnMatchIndex]
                let rowMatchIndex = matchingColumn.map((e) => !!e).indexOf(false);
                unfilledCoordinates = {x: columnMatchIndex, y: rowMatchIndex}
                playerAboutToWin = matchingColumn.filter((e) => !!e)[0]
            }
        }

        function checkDiagonals () {
            let topLeftToBottomRight = [gameState[0][0], gameState[1][1], gameState[2][2]];
            let bottomLeftToTopRight = [gameState[2][0], gameState[1][1], gameState[0][2]];
            return findAndSetMatches();

            function findAndSetMatches() {
                let matches = checkForMatches()
                if(!matches) return false;
                setCoordinatesAndPlayer(matches)
                return true;
            }

            function checkForMatches() {
                if(twoSameAndOneEmpty(topLeftToBottomRight)) return 'tlbr';
                if(twoSameAndOneEmpty(bottomLeftToTopRight)) return 'bltr';
                return false;
            }

            function setCoordinatesAndPlayer(matches) {
                if(matches === 'tlbr') {
                    let emptyIndex = topLeftToBottomRight.map((e) => !!e).indexOf(false);
                    unfilledCoordinates = [{x:0,y:0},{x:1,y:1},{x:2,y:2}][emptyIndex];
                    playerAboutToWin = topLeftToBottomRight.filter((e) => !!e)[0];
                } else {
                    let emptyIndex = bottomLeftToTopRight.map((e) => !!e).indexOf(false);
                    unfilledCoordinates = [{x:0,y:2},{x:1,y:1},{x:2,y:0}][emptyIndex];
                    playerAboutToWin = bottomLeftToTopRight.filter((e) => !!e)[0];
                }
            }
        }
    }
}

exports.impendingMatchLocation = impendingMatchLocation
exports.chooseMove = chooseMove