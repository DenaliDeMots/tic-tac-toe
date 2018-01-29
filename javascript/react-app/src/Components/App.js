import React from 'react';
import GameBoardContainer from './GameBoardContainer';
import StartMenuContainer from './StartMenuContainer';


const backgroundStyle = {
  backgroundColor: '#8DB2F3',
  height: '100%'
}

const App = () => (
  <div id='background' style={backgroundStyle}>
    <StartMenuContainer />
    <GameBoardContainer />
  </div>
)

export default App;