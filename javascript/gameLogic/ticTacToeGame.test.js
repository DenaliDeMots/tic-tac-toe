let ticTacToe = require('./ticTacToeGame');

let player1 = {
    player: 'Bill',
    avater: './bill.png' 
}
let player2 = {
    player: 'Jessie',
    avatar: './jessie.png'
}

test('new game starts properly', () => {
    let game = ticTacToe.newTicTacToeGame(player1, player2);
    expect(game.getCurrentTurn()).toBe('player1')
    //game generates messages for placing tokens
    let message = game.placeToken(0, 0);
    expect(message).toBe('player1 placed token')
    message = game.placeToken(0, 2)
    expect(message).toBe('player2 placed token')
    message = game.placeToken(1, 1)
    expect(message).toBe('player1 placed token')
    //game does not allow placing a token on a taken space
    message = game.placeToken(0, 0)
    expect(message).toBe('coordinates already used')
    //game does not allow an out of bounds move
    message = game.placeToken(0, 5)
    expect(message).toBe('coordinates out of bounds')
})

test('game ends when a player wins', () => {
    let game = ticTacToe.newTicTacToeGame(player1, player2);
    game.placeToken(0, 0);
    game.placeToken(2, 0);
    game.placeToken(1, 1);
    let message = game.placeToken(2, 1);
    //win message doesn't appear before a winning condition
    expect(message).toBe('player2 placed token');
    message = game.placeToken(2, 2);
    //win message appears on a winning condition
    let expectedWinMessage = [{
        matchType: 'diagonal match',
        value: player1,
        startCorner: 'top left'
    }]
    expect(message).toEqual(expectedWinMessage);
    let gameState = game.getCurrentGameState();
    game.placeToken(0, 2);
    let nextGameState = game.getCurrentGameState()
    //additional moves do not get placed
    expect(gameState).toEqual(nextGameState);

})