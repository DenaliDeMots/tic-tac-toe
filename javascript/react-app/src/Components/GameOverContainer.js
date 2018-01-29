import {connect} from 'react-redux';
import GameOver from './GameOver';


const mapStateToProps = ({sessionState, winner}) => {
    return {sessionState, winner}
}

const GameOverContainer = connect(
    mapStateToProps
  )(GameOver)

  export default GameOverContainer;