import React from 'react';
import GameBoardContainer from './GameBoardContainer';
import StartMenuContainer from './StartMenuContainer';
import GameOverContainer from './GameOverContainer'


const backgroundStyle = {
  backgroundColor: '#8DB2F3',
  height: '100%'
}

const App = () => (
  <div id='background' style={backgroundStyle}>
    <GameOverContainer />
    <StartMenuContainer />
    <GameBoardContainer />
  </div>
)

export default App;