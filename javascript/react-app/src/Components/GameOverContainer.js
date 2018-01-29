import {connect} from 'react-redux';
import GameOver from './GameOver';


const mapStateToProps = (state) => {
    return {sessionState: state.sessionState}
}

const GameOverContainer = connect(
    mapStateToProps
  )(GameOver)

  export default GameOverContainer;