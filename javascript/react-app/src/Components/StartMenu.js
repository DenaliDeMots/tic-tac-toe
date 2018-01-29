import React from 'react';
import actionManager from '../actionManager/actionManager';

const containerStyle = {
    display: 'grid',
    gridTemplateAreas: `
        ". . ."
        ". singlePlayerStartButton ."
        ". . ."
        ". twoPlayerStartButton ."
        ". . ."`,
    gridTemplateColumns: '1fr 65vmin 1fr',
    gridTemplateRows: '1fr 20vmin 1fr 20vmin 1fr',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 255, 0.9)'
}

const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'Ivory',
    border: '1vmin solid #354A2E',
    borderRadius: '5vmin',
    fontSize: '5vmin',
    color: '#354A2E'
}

const StartMenu = () => (
    <div style={containerStyle}>
        <div
            style={{...buttonStyle, gridArea: 'singlePlayerStartButton'}}
            //TODO create secondary menu for choosing if human goes first
            onClick={() => {actionManager.startSinglePlayerGame('player 1')}}
        >
            Start Single Player Game
        </div>
        <div
            style={{...buttonStyle, gridArea: 'twoPlayerStartButton'}}
            onClick={() => {actionManager.start2PlayerGame()}}
        >
            Start Two Player Game
        </div>
    </div>
)

export default StartMenu;