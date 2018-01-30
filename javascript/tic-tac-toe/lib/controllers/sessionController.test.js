'use strict';

var sessionController = require('./sessionController');

var addPlayerMessages = sessionController.messages.addPlayer;
var startGameMessages = sessionController.messages.startGame;
var placeMoveMessages = sessionController.messages.placeMove;

//messages emitted by the session controller
var playerAdded = addPlayerMessages.playerAdded;
var cantAddPlayer = addPlayerMessages.cantAddPlayer;
var alreadyStarted = addPlayerMessages.alreadyStarted;
var startingGame = startGameMessages.startingGame;
var notEnoughPlayers = startGameMessages.notEnoughPlayers;
var notYourTurn = placeMoveMessages.notYourTurn;

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

var player1 = 'Sally';
var player2 = 'Billy';

test('adds new players', function () {
    //create a controller for a 2 player game
    var controller = sessionController.newSessionController(gameMock, 2);
    //adding first player gives 'player added' message
    var addPlayerMsg = controller.addPlayer(player1);
    expect(addPlayerMsg).toEqual(playerAdded);
    //adding a second player gives 'player added' message
    addPlayerMsg = controller.addPlayer(player2);
    expect(addPlayerMsg).toEqual(playerAdded);
    //attempting to add a third player gives a 'can't add player' message
    addPlayerMsg = controller.addPlayer('Jim-Bob');
    expect(addPlayerMsg).toEqual(cantAddPlayer);
    //hasPlayer() only returns added players
    expect(controller.hasPlayer(player1)).toBe(true);
    expect(controller.hasPlayer(player2)).toBe(true);
    expect(controller.hasPlayer('Jim-Bob')).toBe(false);
});

test('game starts only after enough players added', function () {
    //create a controller for a 2 player game
    var controller = sessionController.newSessionController(gameMock, 2);
    //starting a game with 0 players gives 'not enough players' message
    var startGameMsg = controller.startGame();
    expect(startGameMsg).toEqual(notEnoughPlayers);
    //starting a game with 1 player gives 'not enough players' message
    controller.addPlayer(player1);
    startGameMsg = controller.startGame();
    expect(startGameMsg).toEqual(notEnoughPlayers);
    //game starts when 2 players have been added
    controller.addPlayer(player2);
    startGameMsg = controller.startGame();
    expect(startGameMsg).toEqual(startingGame);
    //game only starts once
    startGameMsg = controller.startGame();
    expect(startGameMsg).toEqual(alreadyStarted);
    //players cannot be added after a game has started
    var addPlayerMsg = controller.addPlayer('Billy-Bob');
    expect(addPlayerMsg).toEqual(alreadyStarted);
});

test('place move updates game only on valid moves', function () {
    //create a controller for a 2 player game, add players, and start game
    var controller = sessionController.newSessionController(gameMock, 2);
    controller.addPlayer(player1);
    controller.addPlayer(player2);
    controller.startGame();
    //only allow the current player to place a move
    var placeMoveMsg = controller.placeMove(validMove, player2);
    expect(placeMoveMsg).toEqual(notYourTurn);
    placeMoveMsg = controller.placeMove(validMove, player1);
    expect(placeMoveMsg).toEqual(validMove);
    //The turn changes after a valid move is played
    placeMoveMsg = controller.placeMove(validMove, player1);
    expect(placeMoveMsg).toEqual(notYourTurn);
    placeMoveMsg = controller.placeMove(validMove, player2);
    expect(placeMoveMsg).toEqual(validMove);
    //After the last player places a move the turn returns to player 1
    placeMoveMsg = controller.placeMove(validMove, player2);
    expect(placeMoveMsg).toEqual(notYourTurn);
    placeMoveMsg = controller.placeMove(validMove, player1);
    expect(placeMoveMsg).toEqual(validMove);
    //invalid moves return an invalid result
    placeMoveMsg = controller.placeMove(illegalMove, player2);
    expect(gameMock.isValidMove(placeMoveMsg)).toBe(false);
    //invalid moves don't change the turn
    placeMoveMsg = controller.placeMove(validMove, player1);
    expect(placeMoveMsg).toEqual(notYourTurn);
});

test('getCurrentTurn returns the correct turn', function () {
    //create a controller for a 2 player game, add players, and start game
    var controller = sessionController.newSessionController(gameMock, 2);
    controller.addPlayer(player1);
    controller.addPlayer(player2);
    controller.startGame();
    //game starts with player 1
    var currentPlayer = controller.getCurrentTurn();
    expect(currentPlayer).toEqual(player1);
    //current player updates correctly when the turn changes
    controller.placeMove(validMove, player1);
    currentPlayer = controller.getCurrentTurn();
    expect(currentPlayer).toEqual(player2);
});

test('getCurrentGameState gets the game state from the game object', function () {
    gameMock.resetGameState();
    //create a controller for a 2 player game, add players, and start game
    var controller = sessionController.newSessionController(gameMock, 2);
    controller.addPlayer(player1);
    controller.addPlayer(player2);
    controller.startGame();
    var currentGameState = controller.getCurrentGameState();
    expect(currentGameState).toBe(0);
    controller.placeMove(validMove, player1);
    currentGameState = controller.getCurrentGameState();
    expect(currentGameState).toBe(1);
    controller.placeMove(validMove, player2);
    currentGameState = controller.getCurrentGameState();
    expect(currentGameState).toBe(2);
});

test('register callback events for turn changes and have them fire on turn change', function () {
    //create a controller for a 2 player game, add players, and start game
    var controller = sessionController.newSessionController(gameMock, 2);
    controller.addPlayer(player1);
    controller.addPlayer(player2);
    controller.startGame();
    //set callback
    var callbackResult1 = false;
    controller.onTurnChange(function (turnChangeObject) {
        callbackResult1 = turnChangeObject;
    });
    //callback fires on turn change
    controller.placeMove(validMove, player1);
    expect(callbackResult1).toEqual({
        currentTurn: 'player 2',
        player: player2
    });
    controller.placeMove(validMove, player2);
    expect(callbackResult1).toEqual({
        currentTurn: 'player 1',
        player: player1
    });
    //all registered callbacks fire on turn change
    callbackResult1 = false;
    var callbackResult2 = false;
    controller.onTurnChange(function (turnChangeObject) {
        callbackResult2 = turnChangeObject;
    });
    controller.placeMove(validMove, player1);
    expect(callbackResult1).toEqual({
        currentTurn: 'player 2',
        player: player2
    });
    expect(callbackResult2).toEqual({
        currentTurn: 'player 2',
        player: player2
    });
});