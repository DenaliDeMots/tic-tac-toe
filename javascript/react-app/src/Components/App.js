import React from 'react';
import GameBoardContainer from './GameBoardContainer';
import StartMenu from './StartMenu';


const backgroundStyle = {
  backgroundColor: '#8DB2F3',
  height: '100%'
}

const App = () => (
  <div id='background' style={backgroundStyle}>
    <StartMenu />
    <GameBoardContainer />
  </div>
)

export default App;