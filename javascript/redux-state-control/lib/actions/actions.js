'use strict';

var updateGameBoard = function updateGameBoard(gameBoard) {
    return {
        type: 'UPDATE_GAMEBOARD',
        gameBoard: gameBoard
    };
};

var setPlayer = function setPlayer(player) {
    return {
        type: 'SET_PLAYER',
        player: player
    };
};

var startGame = {
    type: 'START_GAME'
};

var gameOver = {
    type: 'GAME_OVER'
};

var setWinner = function setWinner(winner) {
    return {
        type: 'SET_WINNER',
        winner: winner
    };
};

var reset = {
    type: 'RESET'
};

module.exports = {
    updateGameBoard: updateGameBoard,
    setPlayer: setPlayer,
    startGame: startGame,
    gameOver: gameOver,
    setWinner: setWinner,
    reset: reset
};