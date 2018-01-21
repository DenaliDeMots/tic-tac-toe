const sessionController = require('./sessionController');

const addPlayerMessages = sessionController.messages.addPlayer;
const startGameMessages = sessionController.messages.startGame;

//messages emitted by the session controller
const playerAdded = addPlayerMessages.playerAdded;
const cantAddPlayer = addPlayerMessages.cantAddPlayer;
const alreadyStarted = addPlayerMessages.alreadyStarted;
const startingGame = startGameMessages.startingGame
const notEnoughPlayers = startGameMessages.notEnoughPlayers


const gameMock = {

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