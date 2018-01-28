import React from 'react';
import GameBoardContainer from './GameBoardContainer';
import StartMenu from './StartMenu';

const style = {
  display: 'grid',
  gridTemplateAreas: `
    ". . ."
    ". gameBoard ."
    ". . ."`,
  gridTemplateColumns: '1fr 90vmin 1fr',
  gridTemplateRows: '1fr 90vmin 1fr',
  height: '100%'
}

const backgroundStyle = {
  backgroundColor: '#8DB2F3',
  height: '100%'
}

const App = () => (
  <div style={backgroundStyle}>
    <div style={style}>
      <StartMenu />
      <GameBoardContainer gridArea={'gameBoard'}/>
    </div>
  </div>
)

export default App;