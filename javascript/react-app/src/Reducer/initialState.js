const gameBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
]

const INITIAL_STATE = {
    gameBoard,
    player: 'player1', // 'player1' || 'player2'
    sessionState: 'startMenu' // 'startMenu' || 'gameInProgress' || 'gameOver'
}

export default INITIAL_STATE;