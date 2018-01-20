let ticTacToe = require('./ticTacToeGame');

test('new game starts properly', () => {
    let player1 = {
        player: 'Bill',
        avater: './bill.png' 
    }
    let player2 = {
        player: 'Jessie',
        avatar: './jessie.png'
    }

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