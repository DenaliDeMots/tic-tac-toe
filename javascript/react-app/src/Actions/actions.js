

export const updateGameBoardAction = (gameBoard) => ({
    type: 'UPDATE_GAMEBOARD',
    gameBoard
})

export const setPlayer = (player) => ({
    type: 'SET_PLAYER',
    player
})

export const startGame = {
    type: 'START_GAME'
}

export const gameOver = {
    type: 'GAME_OVER'
}