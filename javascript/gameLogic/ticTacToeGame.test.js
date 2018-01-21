let ticTacToe = require('./ticTacToeGame');

const msgs = ticTacToe.messages;

const player1 = msgs.players.player1;
const player2 = msgs.players.player2;
const player1PlacedToken = msgs.placeToken.player1PlacedToken;
const player2PlacedToken = msgs.placeToken.player2PlacedToken;
const alreadyUsed = msgs.placeTokenError.alreadyUsed;
const outOfBounds = msgs.placeTokenError.outOfBounds;
const stalemate = msgs.winMessages.stalemate;
const horizontal = msgs.winMessages.matchMessages.horizontalMatch;
const vertical = msgs.winMessages.matchMessages.verticalMatch;
const diagonal = msgs.winMessages.matchMessages.diagonalMatch;

let token1 = {
    player: 'Bill',
    avater: './bill.png' 
}
let token2 = {
    player: 'Jessie',
    avatar: './jessie.png'
}

test('new game starts properly', () => {
    let game = ticTacToe.newTicTacToeGame(token1, token2);
    expect(game.getCurrentTurn()).toBe(player1)
    //game generates messages for placing tokens
    let message = game.placeToken(0, 0);
    expect(message).toBe(player1PlacedToken)
    message = game.placeToken(0, 2)
    expect(message).toBe(player2PlacedToken)
    message = game.placeToken(1, 1)
    expect(message).toBe(player1PlacedToken)
    //game does not allow placing a token on a taken space
    message = game.placeToken(0, 0)
    expect(message).toBe(alreadyUsed)
    //game does not allow an out of bounds move
    message = game.placeToken(0, 5)
    expect(message).toBe(outOfBounds)
})

test('game ends when a player wins or when there are no moves left to play', () => {
    let game = ticTacToe.newTicTacToeGame(token1, token2);
    game.placeToken(0, 0);
    game.placeToken(2, 0);
    game.placeToken(1, 1);
    let message = game.placeToken(2, 1);
    //win message doesn't appear before a winning condition
    expect(message).toBe(player2PlacedToken);
    message = game.placeToken(2, 2);
    //win message appears on a winning condition
    let expectedWinMessage = [{
        matchType: diagonal.matchType,
        value: token1,
        [diagonal.locationIdentifierKey]: diagonal.locations.topLeft
    }]
    expect(message).toEqual(expectedWinMessage);
    let gameState = game.getCurrentGameState();
    game.placeToken(0, 2);
    let nextGameState = game.getCurrentGameState()
    //additional moves do not get placed
    expect(gameState).toEqual(nextGameState);
    //stalemate games return stalemate message
    game = ticTacToe.newTicTacToeGame('X', 'Y');
    game.placeToken(0, 0);    
    game.placeToken(2, 0);
    game.placeToken(1, 1);
    game.placeToken(2, 2);
    game.placeToken(2, 1);
    game.placeToken(0, 1);
    game.placeToken(1, 2);
    game.placeToken(1, 0);
    message = game.placeToken(0, 2);
    let expectedGameState = [
        ['X','Y','Y'],
        ['Y','X','X'],
        ['X','X','Y']
    ]
    gameState = game.getCurrentGameState();
    expect(gameState).toEqual(expectedGameState);
    expect(message).toBe(stalemate)
})