import store from 'redux-state-control/store/store';
import newGame from 'redux-state-control/gameController/gameController';

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
        startSinglePlayerGame(...args){
            return game.startSinglePlayerGame(...args)
        },

        start2PlayerGame(...args) {
            return game.start2PlayerGame(...args)
        },

        playMove(...move){
            return game.playMove(...move)
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