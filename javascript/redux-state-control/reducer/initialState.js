import deepFreeze from 'deep-freeze'

const gameBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
]

const INITIAL_STATE = deepFreeze({
    gameBoard,
    player: 'player 1', // 'player 1' || 'player 2'
    sessionState: 'startMenu', // 'startMenu' || 'gameInProgress' || 'gameOver'
    winner: false // false || 'player 1' || 'player 2'
})

export default INITIAL_STATE;