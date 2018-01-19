
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
                if (grid[yCoordinate][xCoordinate]) return 'coordinates already used'
                grid[yCoordinate][xCoordinate] = mark;
                return 'value added'
            } else {
                return 'out of bounds'
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
                    matchType: 'horizontal match',
                    value,
                    rowIndex
                }
            }
        },

        getVerticalMatchingValues () {
            matches = [];
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
                    matchType: 'vertical match',
                    value,
                    columnIndex
                }
            }
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

exports.makeGrid = makeGrid