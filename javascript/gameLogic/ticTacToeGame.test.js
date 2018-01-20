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
})