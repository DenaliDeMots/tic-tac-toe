const sessionController = require('./sessionController');

const addPlayerMessages = sessionController.messages.addPlayer;
const startGameMessages = sessionController.messages.startGame;
const placeMoveMessages = sessionController.messages.placeMove;

//messages emitted by the session controller
const playerAdded = addPlayerMessages.playerAdded;
const cantAddPlayer = addPlayerMessages.cantAddPlayer;
const alreadyStarted = addPlayerMessages.alreadyStarted;
const startingGame = startGameMessages.startingGame;
const notEnoughPlayers = startGameMessages.notEnoughPlayers;
const notYourTurn = placeMoveMessages.notYourTurn;

const validMove = 'you made a valid move';
const illegalMove = 'you made an illegal move';
const gameMock = {
    play(move){
        return move;
    },
    isValidMove(result){
        return result === validMove;
    }
};

const player1 = 'Sally';
const player2 = 'Billy'

test('adds new players', () => {
    //create a controller for a 2 player game
    const controller = sessionController.newSessionController(gameMock, 2);
    //adding first player gives 'player added' message
    let addPlayerMsg = controller.addPlayer(player1);
    expect(addPlayerMsg).toEqual(playerAdded);
    //adding a second player gives 'player added' message
    addPlayerMsg = controller.addPlayer(player2);
    expect(addPlayerMsg).toEqual(playerAdded);
    //attempting to add a third player gives a 'can't add player' message
    addPlayerMsg = controller.addPlayer('Jim-Bob');
    expect(addPlayerMsg).toEqual(cantAddPlayer);
})

test('game starts only after enough players added', () => {
    //create a controller for a 2 player game
    const controller = sessionController.newSessionController(gameMock, 2);
    //starting a game with 0 players gives 'not enough players' message
    let startGameMsg = controller.startGame();
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
    let addPlayerMsg = controller.addPlayer('Billy-Bob');
    expect(addPlayerMsg).toEqual(alreadyStarted);
})

test('place move updates game only on valid moves', () =>{
    //create a controller for a 2 player game, add players, and start game
    const controller = sessionController.newSessionController(gameMock, 2);
    controller.addPlayer(player1);
    controller.addPlayer(player2);
    controller.startGame();
    //only allow the current player to place a move
    let placeMoveMsg = controller.placeMove(validMove, player2);
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
})

test('getCurrentTurn returns the correct turn', () => {
  //create a controller for a 2 player game, add players, and start game
  const controller = sessionController.newSessionController(gameMock, 2);
  controller.addPlayer(player1);
  controller.addPlayer(player2);
  controller.startGame();
  //game starts with player 1
  let currentPlayer = controller.getCurrentTurn()
  expect(currentPlayer).toEqual(player1);
  //current player updates correctly when the turn changes
  controller.placeMove(validMove, player1);
  currentPlayer = controller.getCurrentTurn();
  expect(currentPlayer).toEqual(player2);
})