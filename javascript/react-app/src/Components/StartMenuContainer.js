import {connect} from 'react-redux';
import StartMenu from './StartMenu';


const mapStateToProps = (state) => {
    return {sessionState: state.sessionState}
}

const StartMenuContainer = connect(
    mapStateToProps
  )(StartMenu)

  export default StartMenuContainer;