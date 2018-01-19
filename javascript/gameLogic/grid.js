
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