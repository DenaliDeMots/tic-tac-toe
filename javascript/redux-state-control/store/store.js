const {createStore} = require('redux');
const reducer = require('../reducer/reducer');


const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

module.exports = store;