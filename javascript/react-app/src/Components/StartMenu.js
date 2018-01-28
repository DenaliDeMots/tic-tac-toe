import React from 'react';

const containerStyle = {
    display: 'grid',
    gridTemplateAreas: `
        ". . ."
        ". singlePlayerStartButton ."
        ". . ."
        ". 2PlayerStartButton ."
        ". . ."`,
    gridTemplateColumns: '1fr 60vmin 1fr',
    gridTemplateRows: '1fr 20vmin 1fr 20vmin 1fr',
    width: '100%',
    height: '100%',
    backgroundColor: 'blue'
}

const buttonStyle = {
    fontSize: '20vmin',
    fontColor: 'magenta'
}

const StartMenu = () => (
    <div style={containerStyle}>
        <div style={{...buttonStyle, gridArea: 'singlePlayerStartButton'}}>
            'Start Single Player Game'
        </div>
        <div style={{...buttonStyle, gridArea: '2PlayerStartButton'}}>
            'Start Two Player Game'
        </div>
    </div>
)

export default StartMenu;