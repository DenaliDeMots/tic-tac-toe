This package was bootstrapped with create-react-app.  It contains 13 scripts in the src folder.

actionManager/
  actionManager.js) This is the connection point between the react app and the redux-state-control package.  It directly consumes the game controller and connects it with the local redux store.  All the components in this package call methods on the action manager and the action manager dispatches actions to the local store.

Components/
  App.js)  The top level component of the app.  It renders the game board, the start menu screen, and the game over screen.
  Cell.js)  Presentational component that represents a space on the game board and conditionally renders X and O marks
  GameBoard.js)  Presentational component that renders the tic tac toe grid.  It renders 9 cells and passes them appropriate props for the mark at each location based on the current state of the game board.
  GameBoardContainer.js)  Container component connecting the game board state to the GameBoard props.
  GameOver.js)  Presentational component that renders the game over menu.
  GameOverContainer.js)  Container component that connects the state of the game session and the winner to the GameOver props.
  GreenO.js)  Presentational component that renders a green O.  Uses an svg image that was converted to jsx.
  RedX.js)  Presentational component that renders a red X.  Uses an svg image that was converted to jsx.
  StartMenu.js)  Presentational component that renders the start menu.
  StartMenuContainer.js)  Container component that maps the state of the session to the StartMenu props.

index.js) The entry point for the app.  Wraps the App component in a Redux Provider component.
index.css)  Styles the body to eliminate the default padding and allows the app to take up the entire viewport without introducing scrollbars.