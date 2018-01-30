'use strict';

var reducer = require('./reducer');
var INITIAL_STATE = require('./initialState');

var _require = require('../actions/actions'),
    updateGameBoard = _require.updateGameBoard,
    setPlayer = _require.setPlayer,
    startGame = _require.startGame,
    gameOver = _require.gameOver,
    setWinner = _require.setWinner,
    reset = _require.reset;

test('the update game board action updates the gameboard field in the state', function () {
    var newGameBoard = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
    var action = updateGameBoard(newGameBoard);
    expect(reducer(undefined, action).gameBoard).toEqual(newGameBoard);
});

test('the change player action toggles between player 1 and 2', function () {
    var currentPlayer = INITIAL_STATE.player;
    expect(currentPlayer).toBe('player 1');
    var setPlayerAction = setPlayer('player 2');
    expect(setPlayerAction).toEqual({ type: 'SET_PLAYER', player: 'player 2' });
    var nextState = reducer(undefined, setPlayer('player 2'));
    expect(nextState.player).toBe('player 2');
    nextState = reducer(nextState, setPlayer('player 1'));
    expect(nextState.player).toBe('player 1');
    expect(nextState).toEqual(INITIAL_STATE);
});

test('sessionState toggles between startMenu, gameInProgress, and gameOver', function () {
    expect(INITIAL_STATE.sessionState).toBe('startMenu');
    var nextState = reducer(INITIAL_STATE, startGame);
    expect(nextState.sessionState).toBe('gameInProgress');
    nextState = reducer(nextState, gameOver);
    expect(nextState.sessionState).toBe('gameOver');
    nextState = reducer(nextState, reset);
    expect(nextState.sessionState).toEqual('startMenu');
    //only allow session state to be transitioned with the appropriate actions
    nextState = reducer(nextState, gameOver);
    expect(nextState.sessionState).toBe('startMenu');
    nextState = reducer(nextState, startGame);
    expect(nextState.sessionState).toBe('gameInProgress');
    nextState = reducer(nextState, startGame);
    expect(nextState.sessionState).toBe('gameInProgress');
});

test('set winner sets the winner', function () {
    expect(INITIAL_STATE.winner).toBe(false);
    var nextState = reducer(INITIAL_STATE, setWinner('player 1'));
    expect(nextState.winner).toBe('player 1');
});