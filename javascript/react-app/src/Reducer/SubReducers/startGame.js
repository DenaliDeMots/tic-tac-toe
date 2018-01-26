
//starts game if at start menu, otherwise returns to start menu
const startGame = (sessionState) => (
    sessionState === 'startMenu' ? 'gameInProgress' : 'startMenu'
)

export default startGame