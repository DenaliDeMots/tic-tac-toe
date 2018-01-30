const deepFreeze = require('deep-freeze');

//messages emmited by grid objects
const coordinatesAlreadyUsed = 'coordinates already used';
const valueAdded = 'value added';
const coordinatesOutOfBounds = 'coordinates out of bounds';
const horizontalMatchType = 'horizontal match';
const horizontalMatchIdKey = 'rowIndex';
const verticalMatchType = 'vertical match';
const verticalMatchIdKey = 'columnIndex';
const diagonalMatchType = 'diagonal match';
const diagonalMatchIdKey = 'startCorner';
const diagonalMatchLocations = {
    topLeft: 'top left',
    bottomLeft: 'bottom left',
    topRight: 'top right',
    bottomRight: 'bottom right'
};

const gridMessages = {
    setValueAt: {
        coordinatesAlreadyUsed,
        valueAdded,
        coordinatesOutOfBounds
    },
    matchMessages: {
        horizontalMatch: {
            matchType: horizontalMatchType,
            locationIdentifierKey: horizontalMatchIdKey
        },
        verticalMatch: {
            matchType: verticalMatchType,
            locationIdentifierKey: verticalMatchIdKey
        },
        diagonalMatch: {
            matchType: diagonalMatchType,
            locationIdentifierKey: diagonalMatchIdKey,
            locations: diagonalMatchLocations
        }
    }
}
deepFreeze(gridMessages)

function makeGrid (xSize, ySize) {
    
    //private state

    //represent the board as a 3x3 2d array initialized with undefined elements
    //the outter array index is the y coordinate, the inner array index is the x coordinate
    //the grid origin is the top left corner
    if (xSize < 1) xSize = 1;
    if (ySize < 1) ySize = 1;

    let grid = [];
    for (let i = 0; i < ySize; i++) {
        let row = []
        for (let j = 0; j < xSize; j++) {
            row.push(undefined)
        }
        grid.push(row)
    }

    let publicMethods = {
        //places a value grid.  Returns a string indicating success or failure
        setValueAt (mark, xCoordinate, yCoordinate) {
            if(xCoordinate <= xSize && yCoordinate <= ySize) {
                if (grid[yCoordinate][xCoordinate]) return coordinatesAlreadyUsed
                grid[yCoordinate][xCoordinate] = mark;
                return valueAdded
            } else {
                return coordinatesOutOfBounds
            }
            
        },

        valueAt (xCoordinate, yCoordinate) {
            return grid[yCoordinate][xCoordinate];
        },

        getHorizontalMatchingValues() {
            let matches = [];
            for (let i = 0; i < grid.length; i++){
                if(everyValueInRowIsTruthyAndTheSame(grid[i])) {
                    matches.push(newMatchObject(grid[i][0], i));
                }
            }
            return matches;

            //helper functions
            function everyValueInRowIsTruthyAndTheSame(row) {
                let firstElement = row[0];
                return (firstElement
                    &&
                    row.every((value) => value === firstElement)
                )
            }

            function newMatchObject(value, rowIndex) {
                return {
                    matchType: horizontalMatchType,
                    value,
                    [horizontalMatchIdKey]: rowIndex
                }
            }
        },

        getVerticalMatchingValues () {
            let matches = [];
            for(let i = 0; i < grid[0].length; i++) {
                let startElement = grid[0][i];
                let match = !!startElement; //falsey values don't count as matches
                for(let j = 0; j < grid[0].length; j++) {
                    if(grid[j][i] !== startElement) match = false;
                }
                if(match) {
                    matches.push(newMatchObject(grid[0][i], i))
                }
            }
            return matches;

            //helper functions
            function newMatchObject(value, columnIndex) {
                return {
                    matchType: verticalMatchType,
                    value,
                    [verticalMatchIdKey]:columnIndex
                }
            }
        },

        getDiagonalMatchingValues () {
            //only matches diagonals starting in a corner
            let matches = []
            matchDiagonalsFromLeft()
            //only check 'from right' diagonals if the grid is not a square
            if(xSize !== ySize) matchDiagonalsFromRight()
            return matches;

            //helper functions
            function matchDiagonalsFromLeft () {
                pushIfMatch(matchFromTopLeft());
                pushIfMatch(matchFromBottomLeft());
            }

            function matchDiagonalsFromRight () {
                pushIfMatch(matchFromTopRight());
                pushIfMatch(matchFromBottomRight());
            }

            function pushIfMatch(matchResult){
                if(matchResult) matches.push(matchResult)
            }

            function newMatchObject(value, startCorner) {
                return {
                    matchType: diagonalMatchType,
                    value,
                    [diagonalMatchIdKey]: startCorner
                }
            }

            //matching functions
            function matchFromTopLeft () {
                let topLeftElement = grid[0][0];
                if(!topLeftElement) return false
                let smallerSideSize = xSize < ySize ? xSize : ySize;
                if(checkForMatches()) return newMatchObject(topLeftElement, diagonalMatchLocations.topLeft);

                function checkForMatches () {
                    for(let i = 0; i < smallerSideSize; i++) {
                     if(grid[i][i] !== topLeftElement) return false
                    }
                    return true;
                }
            }

            function matchFromBottomLeft () {
                let bottomLeftElement = grid[grid.length - 1][0]
                if(!bottomLeftElement) return false
                let smallerSideSize = xSize < ySize ? xSize : ySize;
                if(checkForMatches()) return newMatchObject(bottomLeftElement, diagonalMatchLocations.bottomLeft)
                
                function checkForMatches() {
                    for(let i = 0; i < smallerSideSize; i++){
                        if(grid[grid.length - (i+1)][i] !== bottomLeftElement) return false;
                    }
                    return true;
                }
            }

            function matchFromTopRight () {
             //Implement if a non-square grid is required   
            }

            function matchFromBottomRight () {
            //Implement if a non-square grid is required
            }
        },

        isGridFull() {
            for(let i = 0; i < grid.length; i++){
                for(let j = 0; j < grid[0].length; j++){
                    if(!grid[i][j]) return false
                }
            }
            return true
        },

        gridStateAs2dArray () {
            //make a copy of the grid state
            let arrays = []
            for (let i = 0; i < grid.length; i++) {
                arrays.push(grid[i].slice(0));
            }
            return arrays;
        }
    }
    return publicMethods
}

exports.makeGrid = makeGrid;
exports.messages = gridMessages;