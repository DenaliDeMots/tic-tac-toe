

const updateGameBoard = (gameBoard) => ({
    type: 'UPDATE_GAMEBOARD',
    gameBoard
})

const setPlayer = (player) => ({
    type: 'SET_PLAYER',
    player
})

const startGame = {
    type: 'START_GAME'
}

const gameOver = {
    type: 'GAME_OVER'
}

const setWinner = (winner) => ({
    type: 'SET_WINNER',
    winner
})

const reset = {
    type: 'RESET'
}

module.exports = {
    updateGameBoard,
    setPlayer,
    startGame,
    gameOver,
    setWinner,
    reset
}