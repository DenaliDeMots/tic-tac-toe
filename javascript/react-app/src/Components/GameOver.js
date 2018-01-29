import React from 'react';
import actionManager from '../actionManager/actionManager';

const containerStyle = {
    display: 'grid',
    gridTemplateAreas: `
        ". . ."
        ". replay ."
        ". . ."`,
    gridTemplateColumns: '1fr 65vmin 1fr',
    gridTemplateRows: '1fr 20vmin 1fr',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(75, 75, 75, 0.2)'
}

const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Ivory',
    border: '1vmin solid #354A2E',
    borderRadius: '5vmin',
    fontSize: '5vmin',
    color: '#354A2E',
    textAlign: 'center'
}

const hiddenContainerStyle = {
    ...containerStyle,
    transform: 'translateY(-100%)',
    transition: 'transform 0.5s ease'
}

const GameOver = ({sessionState, winner}) => (
    <div style={sessionState === 'gameOver' ? containerStyle : hiddenContainerStyle}>
        <div
            style={{...buttonStyle, gridArea: 'replay'}}
            onClick={() => {actionManager.reset()}}
        >
            {winner ? (winner === 'player 1' ? 'X Wins!' : 'O Wins!') : 'Stalemate'}
            <br/>
            Play Again?
        </div>
    </div>
)

export default GameOver;