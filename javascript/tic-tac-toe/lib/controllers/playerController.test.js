'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var playerController = require('./playerController');
var sessionController = require('./sessionController');

var alreadyStarted = sessionController.messages.addPlayer.alreadyStarted;
var cantAddMorePlayers = sessionController.messages.addPlayer.cantAddPlayer;
var notYourTurn = sessionController.messages.placeMove.notYourTurn;

var validMove = 'you made a valid move';
var illegalMove = 'you made an illegal move';

var gameState = 0;
var gameMock = {
    play: function play(move) {
        gameState++;
        return move;
    },
    isValidMove: function isValidMove(result) {
        return result === validMove;
    },
    getCurrentGameState: function getCurrentGameState() {
        return gameState;
    },
    resetGameState: function resetGameState() {
        gameState = 0;
    }
};

var billy = 'Billy';
var sally = 'Sally';

test('playMove() plays only valid moves on your turn', function () {
    gameMock.resetGameState();
    //create 2 player game session
    var gameSession = sessionController.newSessionController(gameMock, 2);
    //add 2 players to the game session by creating player controllers
    var billyController = playerController.newPlayerController(gameSession, billy);
    var sallyController = playerController.newPlayerController(gameSession, sally);
    expect(_typeof(billyController.playMove)).toBe('function');
    expect(_typeof(sallyController.playMove)).toBe('function');
    //game session should not allow more than 2 player controllers to be created
    var jimmyController = playerController.newPlayerController(gameSession, 'Jimmy');
    expect(jimmyController).toEqual(cantAddMorePlayers);
    //start game
    gameSession.startGame();
    //player controllers cannot be created on a game session that has already been started
    jimmyController = playerController.newPlayerController(gameSession, 'Jimmy');
    expect(jimmyController).toEqual(alreadyStarted);
    //billy is player 1 and is currently the only controller that can play a move
    var playMoveMessage = sallyController.playMove(validMove);
    expect(playMoveMessage).toEqual(notYourTurn);
    //the turn only changes when the current player plays a valid move
    playMoveMessage = billyController.playMove(illegalMove);
    expect(playMoveMessage).toEqual(illegalMove);
    playMoveMessage = sallyController.playMove(validMove);
    expect(playMoveMessage).toEqual(notYourTurn);
    playMoveMessage = billyController.playMove(validMove);
    //billy played a valid move so control changes to sally
    playMoveMessage = billyController.playMove(validMove);
    expect(playMoveMessage).toEqual(notYourTurn);
    playMoveMessage = sallyController.playMove(validMove);
    expect(playMoveMessage).toEqual(validMove);
    //sally played her move and control returns to billy
    playMoveMessage = sallyController.playMove(validMove);
    expect(playMoveMessage).toEqual(notYourTurn);
    playMoveMessage = billyController.playMove(validMove);
    expect(playMoveMessage).toEqual(validMove);
});

test('turn notifier registers a callback that gets fired on turn change', function () {
    gameMock.resetGameState();
    //create 2 player game session
    var gameSession = sessionController.newSessionController(gameMock, 2);
    //create a player controller for billy
    var billyController = playerController.newPlayerController(gameSession, billy);
    //turn notifier callbacks can be registered before or after the game starts
    var billyTurnNotifications = false;
    billyController.turnNotifier(function (turnChangeNotification) {
        billyTurnNotifications = turnChangeNotification;
    });
    //create a player controller for sally
    var sallyController = playerController.newPlayerController(gameSession, sally);
    gameSession.startGame();
    //the first turn notification doesn't fire until player 1 makes their first move
    expect(billyTurnNotifications).toBe(false);
    billyController.playMove(validMove);
    expect(billyTurnNotifications).toEqual({
        currentTurn: 'player 2',
        player: sally
    });
    //turn notifications can be added after the game has started
    var sallyTurnNotifications = false;
    sallyController.turnNotifier(function (turnChangeNotification) {
        sallyTurnNotifications = turnChangeNotification;
    });
    sallyController.playMove(validMove);
    expect(sallyTurnNotifications).toEqual({
        currentTurn: 'player 1',
        player: billy
    });
    expect(billyTurnNotifications).toEqual({
        currentTurn: 'player 1',
        player: billy
    });
});

test('player controllers can get the current game state', function () {
    gameMock.resetGameState();
    //create game session and player controllers
    var gameSession = sessionController.newSessionController(gameMock, 2);
    var billyController = playerController.newPlayerController(gameSession, billy);
    var sallyController = playerController.newPlayerController(gameSession, sally);
    gameSession.startGame();
    var currentGameState = billyController.getCurrentGameState();
    expect(currentGameState).toEqual(gameMock.getCurrentGameState());
    billyController.playMove(validMove);
    currentGameState = billyController.getCurrentGameState();
    expect(currentGameState).toEqual(gameMock.getCurrentGameState());
});