'use strict';

var _require = require('redux'),
    createStore = _require.createStore;

var reducer = require('../reducer/reducer');

var store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;