import {connect} from 'react-redux';
import GameBoard from './GameBoard';

const mapStateToProps = (state) => {
    return {board: state.gameBoard}
}

const GameBoardContainer = connect(
    mapStateToProps
  )(GameBoard)

  export default GameBoardContainer;