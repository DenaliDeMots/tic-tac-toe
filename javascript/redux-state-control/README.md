This package implements state control using redux and a game controller.  It contains 5 scripts.

    actions/
        actions.js)  Defines the action objects consumed by the Redux reducer.

    gameController/
        gameController.js)  Wraps the tic tac toe game from the tic-tac-toe package like a side effect in a Redux application.  It provides methods which are called by the react components to update the state and then dispatches actions to the Redux store.  It takes the Redux store as an argument to its constructor.
    
    reducer/
        initialState.js) Defines the initial state tree of the redux application.
        reducer.js) Defines the Redux reducer for updating state
    
    store/
        store.js)  Contains a Redux store created with the reducer.  Mostly used for testing.

This state management package is kept seperate from any react package so that it can be reused in multiple GUI scenarios.  (e.g. it allows the game logic to either be run directly in a browser or on a server that dispatches actions over a websocket and to be used with a front-end framework besides react)