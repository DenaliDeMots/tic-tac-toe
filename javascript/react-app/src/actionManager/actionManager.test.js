import actionManager from './actionManager';
import replaceGameController from 'redux-state-control/gameController/gameController.test';
import {reset} from 'redux-state-control/actions/actions'

function newGame () {
    actionManager.reset(reset);
    return actionManager;
}

replaceGameController(newGame);

