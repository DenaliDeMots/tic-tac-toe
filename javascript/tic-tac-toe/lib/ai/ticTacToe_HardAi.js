"use strict";

/* Ai for playing tic tac toe games.  It is a hard difficulty
level which means that it cannot be beaten.

Strategy:
Rule 1) If a winning move is available, take it!

Rule 2) if your opponent has an impending match you must block it

Rule 3) strategic move:
    Turn 1) Play a corner
    Turn 2) If the opponent played a corner, play center.
        If the opponent played center, play a corner.
        If the opponent played a side, play an adjacent corner
    Turn 3) If opponent played center play diagonally opposite
        Otherwise pick a corner with a horizontal or vertical
        impending win
    Turn 4) If the opponent is in a corner, you are in the
        center, and there are no required blocking moves,
        play a center side space that creates an impending win

Rule 4) pick a space that gives you 2 impending win moves

Rule 5) If the opponent can play a move that creates 2
    impending win moves for them, block it

Rule 6) if no other rule applies, pick a random space
*/

function chooseMove(gameState, aiToken, opponentToken) {
    var winningMove = findWinningMove();
    var requiredBlockingMove = findRequiredBlockingMove();
    var strategicMove = createStrategicMove();
    var doubleImpendingWinMove = createDoubleImpendingWin();
    var doubleImpendingBlock = createDoubleImpendingBlock();
    var impendingWinMove = createImpendingWin();
    var randomMove = createRandomMove();
    return winningMove || requiredBlockingMove || strategicMove || doubleImpendingWinMove || doubleImpendingBlock || impendingWinMove || randomMove;

    function findWinningMove() {
        //check to see if any winning moves are available
        var move = impendingMatchLocations(gameState, aiToken);
        return move ? move[0] : move;
    }

    function findRequiredBlockingMove() {
        if (winningMove) return false;
        //check the board to see if opponent can win on next turn
        var move = impendingMatchLocations(gameState, opponentToken);
        return move ? move[0] : move;
    }

    function createStrategicMove() {
        if (winningMove || requiredBlockingMove) return false;
        //check to see whether it is turn 1, 2, or 3 by how many
        //pieces are already on the board
        if (boardIsEmpty()) return { x: 0, y: 0 };
        if (boardHasTokens(1)) return playCenterOrCorner();
        if (boardHasTokens(2)) return playDiagonalOrHVCorner();
        if (boardHasTokens(3)) return playSideIfInCenter();
        return false;

        function boardIsEmpty() {
            return gameState.every(function (row) {
                return row.every(function (e) {
                    return !e;
                });
            });
        }

        function boardHasTokens(num) {
            var tokenCount = 0;
            gameState.map(function (row) {
                return row.map(function (element) {
                    if (element) tokenCount += 1;
                });
            });
            return tokenCount === num;
        }

        function playCenterOrCorner() {
            if (opponentPlayedCorner()) return { x: 1, y: 1 };
            if (opponentPlayedCenter()) return { x: 0, y: 0 };
            return playAdjacentCorner();

            function opponentPlayedCorner() {
                var corners = [gameState[0][0], gameState[0][2], gameState[2][0], gameState[2][2]];
                return corners.includes(opponentToken);
            }

            function opponentPlayedCenter() {
                return gameState[1][1] === opponentToken;
            }

            function playAdjacentCorner() {
                if (!rowEmpty(0) || !columnEmpty(0)) return { x: 0, y: 0 };
                return { x: 2, y: 2 };
            }

            function rowEmpty(row) {
                return gameState[row].every(function (e) {
                    return !e;
                });
            }

            function columnEmpty(column) {
                var theColumn = [gameState[0][column], gameState[1][column], gameState[2][column]];
                return theColumn.every(function (e) {
                    return !e;
                });
            }
        }

        function playDiagonalOrHVCorner() {
            if (opponentTokenInCenter()) return { x: 2, y: 2 }; //diagonal move
            return horizontalOrVerticalCornerMove();

            function opponentTokenInCenter() {
                return gameState[1][1] === opponentToken;
            }

            function horizontalOrVerticalCornerMove() {
                if (gameState[0].includes(opponentToken)) return { x: 0, y: 2 };
                return { x: 2, y: 0 };
            }
        }

        function playSideIfInCenter() {
            if (gameState[1][1] !== aiToken) return false;
            var possibleMoves = [{ x: 1, y: 0 }, { x: 1, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }];
            for (var i = 0; i < 4; i++) {
                if (testMove(possibleMoves[i])) return possibleMoves[i];
            }

            function testMove(move) {
                if (gameState[move.y][move.x]) return false;
                var playMove = newGridWithMove(move, aiToken);
                return impendingMatchLocations(playMove, aiToken);
            }
        }
    }

    function createDoubleImpendingWin() {
        if (winningMove || requiredBlockingMove || strategicMove) return false;
        var moves = findAllImpendingWinMoves(aiToken);
        var bestMoves = checkForDoubleImpendingWins(moves, aiToken);
        return bestMoves.length > 0 ? bestMoves[0] : false;
    }

    function createDoubleImpendingBlock() {
        if (winningMove || requiredBlockingMove || strategicMove || doubleImpendingWinMove) return false;
        var problems = findAllImpendingWinMoves(opponentToken);
        var worstProblems = checkForDoubleImpendingWins(problems, opponentToken);
        return worstProblems.length > 0 ? worstProblems[0] : false;
    }

    function createImpendingWin() {
        if (winningMove || requiredBlockingMove || strategicMove || doubleImpendingWinMove || doubleImpendingBlock) return false;
        var moves = findAllImpendingWinMoves(aiToken);
        return moves.length > 0 ? moves[0] : false;
    }

    function createRandomMove() {
        if (winningMove || requiredBlockingMove || strategicMove || doubleImpendingWinMove || doubleImpendingBlock || impendingWinMove) return false;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (!gameState[i][j]) return { x: j, y: i };
            }
        }
        return false;
    }

    //helper functions

    function findAllImpendingWinMoves(player) {
        var allImpendingWinMoves = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (!gameState[i][j]) {
                    var grid = newGridWithMove({ x: j, y: i }, player);
                    var moves = impendingMatchLocations(grid, player);
                    if (moves) allImpendingWinMoves.push({ y: i, x: j });
                }
            }
        }
        return allImpendingWinMoves;
    }

    function checkForDoubleImpendingWins(moveList, player) {
        var doubleMoves = [];
        moveList.map(function (move) {
            var gridWithMove = newGridWithMove(move, player);
            var impendingWins = impendingMatchLocations(gridWithMove, player);
            if (impendingWins && impendingWins.length >= 2) doubleMoves.push(move);
        });
        return doubleMoves;
    }

    function newGridWithMove(_ref, player) {
        var x = _ref.x,
            y = _ref.y;

        var copy = duplicateGrid(gameState);
        copy[y][x] = player;
        return copy;
    }

    function duplicateGrid(grid) {
        return grid.map(function (row) {
            return row.map(function (element) {
                return element;
            });
        });
    }
}

function impendingMatchLocations(gameState, player) {
    var emptySpacesCoordinates = [];
    checkRowsColumnsAndDiagonals();
    return emptySpacesCoordinates.length > 0 ? emptySpacesCoordinates : false;

    function checkRowsColumnsAndDiagonals() {
        checkRows();
        checkColumns();
        checkDiagonals();

        function has2SameAnd1Empty(threeElementArry) {
            //filter out falsey values and check that all remaining marks match player
            var truthyMarks = threeElementArry.filter(function (mark) {
                return !!mark;
            });
            return truthyMarks.length === 2 && truthyMarks.every(function (mark) {
                return mark === player;
            });
        }

        function checkRows() {
            var rows = gameState.map(function (row) {
                return has2SameAnd1Empty(row);
            });
            rows.map(function (row, yIndex) {
                if (!row) return;
                gameState[yIndex].map(function (element, xIndex) {
                    if (element) return;
                    emptySpacesCoordinates.push({ y: yIndex, x: xIndex });
                });
            });
        }

        function checkColumns() {
            var rotatedGrid = columnsAsRows(gameState);
            var columns = rotatedGrid.map(function (column) {
                return has2SameAnd1Empty(column);
            });
            columns.map(function (column, xIndex) {
                if (!column) return;
                rotatedGrid[xIndex].map(function (element, yIndex) {
                    if (element) return;
                    emptySpacesCoordinates.push({ x: xIndex, y: yIndex });
                });
            });

            function columnsAsRows(grid) {
                var rotGrid = [];

                var _loop = function _loop(i) {
                    rotGrid.push(grid.map(function (row) {
                        return row[i];
                    }));
                };

                for (var i = 0; i < grid[0].length; i++) {
                    _loop(i);
                }
                return rotGrid;
            }
        }

        function checkDiagonals() {
            var topLeftToBottomRight = [gameState[0][0], gameState[1][1], gameState[2][2]];
            var bottomLeftToTopRight = [gameState[2][0], gameState[1][1], gameState[0][2]];
            checkTopLeftDiagonal();
            checkBottomLeftDiagonal();

            function checkTopLeftDiagonal() {
                if (has2SameAnd1Empty(topLeftToBottomRight)) {
                    topLeftToBottomRight.map(function (element, index) {
                        if (element) return;
                        emptySpacesCoordinates.push([{ y: 0, x: 0 }, { y: 1, x: 1 }, { y: 2, x: 2 }][index]);
                    });
                }
            }
            function checkBottomLeftDiagonal() {
                if (has2SameAnd1Empty(bottomLeftToTopRight)) {
                    bottomLeftToTopRight.map(function (element, index) {
                        if (element) return;
                        emptySpacesCoordinates.push([{ y: 2, x: 0 }, { y: 1, x: 1 }, { y: 0, x: 2 }][index]);
                    });
                }
            }
        }
    }
}

exports.impendingMatchLocations = impendingMatchLocations;
exports.chooseMove = chooseMove;