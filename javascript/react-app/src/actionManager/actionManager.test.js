import actionManager from './actionManager';
import replaceGameController from '../../../reactStateControl/gameController/gameController.test';
import {reset} from '../../../reactStateControl/actions/actions'

function newGame () {
    actionManager.reset(reset);
    return actionManager;
}

replaceGameController(newGame);

