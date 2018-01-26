const ticTacToe = require('./ticTacToe');

const billy = 'Billy';
const sally = 'Sally';

test('new game creates 2 player controller objects', () => {
    //create new game
    let players = ticTacToe.startTicTacToeGame(billy, sally)
    let player1 = players.player1;
    let player2 = players.player2;
    //player1 and player2 should both be player controllers
    expect(player1.hasOwnProperty('playMove')).toBe(true);
    expect(player1.hasOwnProperty('turnNotifier')).toBe(true);
    expect(player2.hasOwnProperty('playMove')).toBe(true);
    expect(player2.hasOwnProperty('turnNotifier')).toBe(true);
})

test('players can only play valid moves', () => {
    //create new game
    let players = ticTacToe.startTicTacToeGame(billy, sally)
    let player1 = players.player1;
    let player2 = players.player2;
    let currentTurn = false;
    player2.turnNotifier((changeTurnMessage) => {
        currentTurn = changeTurnMessage;
    })
    //valid moves are played
    player1.playMove({
        x: 0,
        y: 0
    })
    let gameState = player1.getCurrentGameState();
    expect(gameState).toEqual([
        [billy, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ])
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    })
    //invalid moves are not played
    player2.playMove({
        x: 0,
        y: 10
    })
    gameState = player2.getCurrentGameState();
    expect(gameState).toEqual([
        [billy, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ])
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    })
    player2.playMove({
        x: 0,
        y: 0
    })
    expect(gameState).toEqual([
        [billy, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ])
    expect(currentTurn).toEqual({
        currentTurn: 'player 2',
        player: sally
    })
})

test('game ends on win', () => {
    //create new game
    let players = ticTacToe.startTicTacToeGame(billy, sally)
    let player1 = players.player1;
    let player2 = players.player2;
    player1.playMove({
        x: 0,
        y: 0
    })
    player2.playMove({
        x: 0,
        y: 1
    })
    player1.playMove({
        x: 1,
        y: 0
    })
    player2.playMove({
        x: 0,
        y: 2
    })
    let winMessage = player1.playMove({
        x: 2,
        y: 0
    })
    let gameState = player2.getCurrentGameState();
    let expectedGameState = [
        [billy, billy, billy],
        [sally, undefined, undefined],
        [sally, undefined, undefined]
    ]
    expect(gameState).toEqual(expectedGameState);
    expect(winMessage).toEqual([{
        matchType: 'horizontal match',
        value: billy,
        rowIndex: 0
    }])
    //finished game does not allow further moves
    player2.playMove({
        x: 1,
        y: 1
    })
    gameState = player2.getCurrentGameState();
    expect(gameState).toEqual(expectedGameState);
})

test('stalemate games end in stalemate', () => {
    //create new game
    let players = ticTacToe.startTicTacToeGame(billy, sally)
    let player1 = players.player1;
    let player2 = players.player2;
    player1.playMove({
        x: 0,
        y: 0
    })
    player2.playMove({
        x: 0,
        y: 1
    })
    player1.playMove({
        x: 2,
        y: 0
    })
    player2.playMove({
        x: 1,
        y: 0
    })
    player1.playMove({
        x: 1,
        y: 1
    })
    player2.playMove({
        x: 2,
        y: 2
    })
    player1.playMove({
        x: 1,
        y: 2
    })
    player2.playMove({
        x: 0,
        y: 2
    })
    let stalemateMessage = player1.playMove({
        x: 2,
        y: 1
    })
    let expectedGameState = [
        [billy,sally,billy],
        [sally,billy,billy],
        [sally,billy,sally]
    ]
    let gameState = player1.getCurrentGameState()
    expect(gameState).toEqual(expectedGameState)
    expect(stalemateMessage).toEqual('stalemate')
})