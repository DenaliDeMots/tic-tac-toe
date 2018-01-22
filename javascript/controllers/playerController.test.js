const playerController = require('./playerController');
const sessionController = require('./sessionController');

const alreadyStarted = sessionController.messages.addPlayer.alreadyStarted;
const cantAddMorePlayers = sessionController.messages.addPlayer.cantAddPlayer;
const notYourTurn = sessionController.messages.placeMove.notYourTurn;

const validMove = 'you made a valid move';
const illegalMove = 'you made an illegal move';

let gameState = 0;
const gameMock = {
    play(move){
        gameState++;
        return move;
    },
    isValidMove(result){
        return result === validMove;
    },
    getCurrentGameState(){
        return gameState;
    },
    resetGameState(){
        gameState = 0;
    }
};

const billy = 'Billy';
const sally = 'Sally';

test('playMove() plays only valid moves on your turn', () => {
    gameMock.resetGameState();
    //create 2 player game session
    let gameSession = sessionController.newSessionController(gameMock, 2);
    //add 2 players to the game session by creating player controllers
    let billyController = playerController.newPlayerController(gameSession, billy);
    let sallyController = playerController.newPlayerController(gameSession, sally);
    expect(typeof billyController.playMove).toBe('function');
    expect(typeof sallyController.playMove).toBe('function');
    //game session should not allow more than 2 player controllers to be created
    let jimmyController = playerController.newPlayerController(gameSession, 'Jimmy');
    expect(jimmyController).toEqual(cantAddMorePlayers);
    //start game
    gameSession.startGame();
    //player controllers cannot be created on a game session that has already been started
    jimmyController = playerController.newPlayerController(gameSession, 'Jimmy');
    expect(jimmyController).toEqual(alreadyStarted);
    //billy is player 1 and is currently the only controller that can play a move
    let playMoveMessage = sallyController.playMove(validMove);
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
})

test('turn notifier registers a callback that gets fired on turn change', () => {
    gameMock.resetGameState();
    //create 2 player game session
    let gameSession = sessionController.newSessionController(gameMock, 2);
    //create a player controller for billy
    let billyController = playerController.newPlayerController(gameSession, billy);
    //turn notifier callbacks can be registered before or after the game starts
    let billyTurnNotifications = false;
    billyController.turnNotifier((turnChangeNotification) => {
        billyTurnNotifications = turnChangeNotification
    })
    //create a player controller for sally
    let sallyController = playerController.newPlayerController(gameSession, sally);
    gameSession.startGame();
    //the first turn notification doesn't fire until player 1 makes their first move
    expect(billyTurnNotifications).toBe(false);
    billyController.playMove(validMove);
    expect(billyTurnNotifications).toEqual({
        currentTurn: 'player 2',
        player: sally
    });
    //turn notifications can be added after the game has started
    let sallTurnNotification = false;
    sallyController.turnNotifier((turnChangeNotification) => {
        sallyTurnNotifications = turnChangeNotification
    })
    sallyController.playMove(validMove);
    expect(sallyTurnNotifications).toEqual({
        currentTurn: 'player 1',
        player: billy
    });
    expect(billyTurnNotifications).toEqual({
        currentTurn: 'player 1',
        player: billy
    });
})

test('player controllers can get the current game state', () => {
    gameMock.resetGameState();
    //create game session and player controllers
    let gameSession = sessionController.newSessionController(gameMock, 2);
    let billyController = playerController.newPlayerController(gameSession, billy);
    let sallyController = playerController.newPlayerController(gameSession, sally);
    gameSession.startGame();
    let currentGameState = billyController.getCurrentGameState();
    expect(currentGameState).toEqual(gameMock.getCurrentGameState());
    billyController.playMove(validMove);
    currentGameState = billyController.getCurrentGameState();
    expect(currentGameState).toEqual(gameMock.getCurrentGameState());  
})