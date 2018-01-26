import React from 'react';
import GameBoard from './GameBoard';

const style = {
  display: 'grid',
  gridTemplateAreas: `
    ". . ."
    ". gameBoard ."
    ". . ."`,
  gridTemplateColumns: '1fr 90vmin 1fr',
  gridTemplateRows: '1fr 90vmin 1fr'
}

const App = () => (
  <div style={style}>
    <GameBoard gridArea={'gameBoard'}/>
  </div>
)

export default App;