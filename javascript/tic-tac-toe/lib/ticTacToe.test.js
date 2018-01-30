'use strict';

var ticTacToe = require('./ticTacToe');

var billy = 'Billy';
var sally = 'Sally';

test('new game creates 2 player controller objects', function () {
    //create new game
    var players = ticTacToe.startTicTacToeGame(billy, sally);
    var player1 = players.player1;
    var player2 = players.player2;
    //player1 and player2 should both be player controllers
    expect(player1.hasOwnProperty('playMove')).toBe(true);
    expect(player1.hasOwnProperty('turnNotifier')).toBe(true);
    expect(player2.hasOwnProperty('playMove')).toBe(true);
    expect(player2.hasOwnProperty('turnNotifier')).toBe(true);
});

test('players can only play valid moves', function () {
    //create new game
    var players = ticTacToe.startTicTacToeGame(billy, sally);
    var player1 = players.player1;
    var player2 = players.player2;
    var currentTurn = false;
    player2.turnNotifier(function (changeTurnMessage) {
        currentTurn = changeTurnMessage;
    });
    //valid moves are played
    player1.playMove({
        x: 0,
        y: 0
    });
    var gameState = player1.getCurrentGameState();
    expect(gameState).toEqual([[billy, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]);
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    });
    //invalid moves are not played
    player2.playMove({
        x: 0,
        y: 10
    });
    gameState = player2.getCurrentGameState();
    expect(gameState).toEqual([[billy, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]);
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    });
    player2.playMove({
        x: 0,
        y: 0
    });
    expect(gameState).toEqual([[billy, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]]);
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    });
});

test('game ends on win', function () {
    //create new game
    var players = ticTacToe.startTicTacToeGame(billy, sally);
    var player1 = players.player1;
    var player2 = players.player2;
    player1.playMove({
        x: 0,
        y: 0
    });
    player2.playMove({
        x: 0,
        y: 1
    });
    player1.playMove({
        x: 1,
        y: 0
    });
    player2.playMove({
        x: 0,
        y: 2
    });
    var winMessage = player1.playMove({
        x: 2,
        y: 0
    });
    var gameState = player2.getCurrentGameState();
    var expectedGameState = [[billy, billy, billy], [sally, undefined, undefined], [sally, undefined, undefined]];
    expect(gameState).toEqual(expectedGameState);
    expect(winMessage).toEqual([{
        matchType: 'horizontal match',
        value: billy,
        rowIndex: 0
    }]);
    //finished game does not allow further moves
    player2.playMove({
        x: 1,
        y: 1
    });
    gameState = player2.getCurrentGameState();
    expect(gameState).toEqual(expectedGameState);
});

test('stalemate games end in stalemate', function () {
    //create new game
    var players = ticTacToe.startTicTacToeGame(billy, sally);
    var player1 = players.player1;
    var player2 = players.player2;
    player1.playMove({
        x: 0,
        y: 0
    });
    player2.playMove({
        x: 0,
        y: 1
    });
    player1.playMove({
        x: 2,
        y: 0
    });
    player2.playMove({
        x: 1,
        y: 0
    });
    player1.playMove({
        x: 1,
        y: 1
    });
    player2.playMove({
        x: 2,
        y: 2
    });
    player1.playMove({
        x: 1,
        y: 2
    });
    player2.playMove({
        x: 0,
        y: 2
    });
    var stalemateMessage = player1.playMove({
        x: 2,
        y: 1
    });
    var expectedGameState = [[billy, sally, billy], [sally, billy, billy], [sally, billy, sally]];
    var gameState = player1.getCurrentGameState();
    expect(gameState).toEqual(expectedGameState);
    expect(stalemateMessage).toEqual('stalemate');
});