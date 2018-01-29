import actionManager from './actionManager';
import replaceGameController from 'redux-state-control/gameController/gameController.test';

function newGame () {
    actionManager.reset();
    return actionManager;
}

replaceGameController(newGame);

