'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var deepFreeze = require('deep-freeze');

//messages emmited by grid objects
var coordinatesAlreadyUsed = 'coordinates already used';
var valueAdded = 'value added';
var coordinatesOutOfBounds = 'coordinates out of bounds';
var horizontalMatchType = 'horizontal match';
var horizontalMatchIdKey = 'rowIndex';
var verticalMatchType = 'vertical match';
var verticalMatchIdKey = 'columnIndex';
var diagonalMatchType = 'diagonal match';
var diagonalMatchIdKey = 'startCorner';
var diagonalMatchLocations = {
    topLeft: 'top left',
    bottomLeft: 'bottom left',
    topRight: 'top right',
    bottomRight: 'bottom right'
};

var gridMessages = {
    setValueAt: {
        coordinatesAlreadyUsed: coordinatesAlreadyUsed,
        valueAdded: valueAdded,
        coordinatesOutOfBounds: coordinatesOutOfBounds
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
};
deepFreeze(gridMessages);

function makeGrid(xSize, ySize) {

    //private state

    //represent the board as a 3x3 2d array initialized with undefined elements
    //the outter array index is the y coordinate, the inner array index is the x coordinate
    //the grid origin is the top left corner
    if (xSize < 1) xSize = 1;
    if (ySize < 1) ySize = 1;

    var grid = [];
    for (var i = 0; i < ySize; i++) {
        var row = [];
        for (var j = 0; j < xSize; j++) {
            row.push(undefined);
        }
        grid.push(row);
    }

    var publicMethods = {
        //places a value grid.  Returns a string indicating success or failure
        setValueAt: function setValueAt(mark, xCoordinate, yCoordinate) {
            if (xCoordinate <= xSize && yCoordinate <= ySize) {
                if (grid[yCoordinate][xCoordinate]) return coordinatesAlreadyUsed;
                grid[yCoordinate][xCoordinate] = mark;
                return valueAdded;
            } else {
                return coordinatesOutOfBounds;
            }
        },
        valueAt: function valueAt(xCoordinate, yCoordinate) {
            return grid[yCoordinate][xCoordinate];
        },
        getHorizontalMatchingValues: function getHorizontalMatchingValues() {
            var matches = [];
            for (var _i = 0; _i < grid.length; _i++) {
                if (everyValueInRowIsTruthyAndTheSame(grid[_i])) {
                    matches.push(newMatchObject(grid[_i][0], _i));
                }
            }
            return matches;

            //helper functions
            function everyValueInRowIsTruthyAndTheSame(row) {
                var firstElement = row[0];
                return firstElement && row.every(function (value) {
                    return value === firstElement;
                });
            }

            function newMatchObject(value, rowIndex) {
                return _defineProperty({
                    matchType: horizontalMatchType,
                    value: value
                }, horizontalMatchIdKey, rowIndex);
            }
        },
        getVerticalMatchingValues: function getVerticalMatchingValues() {
            var matches = [];
            for (var _i2 = 0; _i2 < grid[0].length; _i2++) {
                var startElement = grid[0][_i2];
                var match = !!startElement; //falsey values don't count as matches
                for (var _j = 0; _j < grid[0].length; _j++) {
                    if (grid[_j][_i2] !== startElement) match = false;
                }
                if (match) {
                    matches.push(newMatchObject(grid[0][_i2], _i2));
                }
            }
            return matches;

            //helper functions
            function newMatchObject(value, columnIndex) {
                return _defineProperty({
                    matchType: verticalMatchType,
                    value: value
                }, verticalMatchIdKey, columnIndex);
            }
        },
        getDiagonalMatchingValues: function getDiagonalMatchingValues() {
            //only matches diagonals starting in a corner
            var matches = [];
            matchDiagonalsFromLeft();
            //only check 'from right' diagonals if the grid is not a square
            if (xSize !== ySize) matchDiagonalsFromRight();
            return matches;

            //helper functions
            function matchDiagonalsFromLeft() {
                pushIfMatch(matchFromTopLeft());
                pushIfMatch(matchFromBottomLeft());
            }

            function matchDiagonalsFromRight() {
                pushIfMatch(matchFromTopRight());
                pushIfMatch(matchFromBottomRight());
            }

            function pushIfMatch(matchResult) {
                if (matchResult) matches.push(matchResult);
            }

            function newMatchObject(value, startCorner) {
                return _defineProperty({
                    matchType: diagonalMatchType,
                    value: value
                }, diagonalMatchIdKey, startCorner);
            }

            //matching functions
            function matchFromTopLeft() {
                var topLeftElement = grid[0][0];
                if (!topLeftElement) return false;
                var smallerSideSize = xSize < ySize ? xSize : ySize;
                if (checkForMatches()) return newMatchObject(topLeftElement, diagonalMatchLocations.topLeft);

                function checkForMatches() {
                    for (var _i3 = 0; _i3 < smallerSideSize; _i3++) {
                        if (grid[_i3][_i3] !== topLeftElement) return false;
                    }
                    return true;
                }
            }

            function matchFromBottomLeft() {
                var bottomLeftElement = grid[grid.length - 1][0];
                if (!bottomLeftElement) return false;
                var smallerSideSize = xSize < ySize ? xSize : ySize;
                if (checkForMatches()) return newMatchObject(bottomLeftElement, diagonalMatchLocations.bottomLeft);

                function checkForMatches() {
                    for (var _i4 = 0; _i4 < smallerSideSize; _i4++) {
                        if (grid[grid.length - (_i4 + 1)][_i4] !== bottomLeftElement) return false;
                    }
                    return true;
                }
            }

            function matchFromTopRight() {
                //Implement if a non-square grid is required   
            }

            function matchFromBottomRight() {
                //Implement if a non-square grid is required
            }
        },
        isGridFull: function isGridFull() {
            for (var _i5 = 0; _i5 < grid.length; _i5++) {
                for (var _j2 = 0; _j2 < grid[0].length; _j2++) {
                    if (!grid[_i5][_j2]) return false;
                }
            }
            return true;
        },
        gridStateAs2dArray: function gridStateAs2dArray() {
            //make a copy of the grid state
            var arrays = [];
            for (var _i6 = 0; _i6 < grid.length; _i6++) {
                arrays.push(grid[_i6].slice(0));
            }
            return arrays;
        }
    };
    return publicMethods;
}

exports.makeGrid = makeGrid;
exports.messages = gridMessages;