'use strict';

var deepFreeze = require('deep-freeze');

var gameBoard = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]];

var INITIAL_STATE = deepFreeze({
    gameBoard: gameBoard,
    player: 'player 1', // 'player 1' || 'player 2'
    sessionState: 'startMenu', // 'startMenu' || 'gameInProgress' || 'gameOver'
    winner: false // false || 'player 1' || 'player 2'
});

module.exports = INITIAL_STATE;