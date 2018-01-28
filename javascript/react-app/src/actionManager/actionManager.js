import store from '../../../reactStateControl/store/store';
import newGame from '../../../reactStateControl/gameController/gameController';

function createActionManager () {
    let storeFacade = {
        dispatch(action){
            store.dispatch(action)
        },
        getCurrentState(){
            return store.getCurrentState()
        }
    }

    let game = newGame(storeFacade)

    let publicMethods = {
        startSinglePlayerGame(arg){
            game.startSinglePlayerGame(arg)
        },

        start2PlayerGame() {
            game.start2PlayerGame()
        },

        playMove(move){
            game.playMove(move)
        },

        reset(resetAction){
            store.dispatch(resetAction);
            game = newGame(store)
        }
    }
    return publicMethods;
}

const actionManager = createActionManager()

export default actionManager;