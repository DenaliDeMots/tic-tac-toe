This package implements a command line interface for the tic-tac-toe package.  It was built using the inquirer package to build the menus and the chalk package to style the text.

Inquirer controls the flow of questions by chaining promises together.  The entry point for the app is the startGame() function.  Then the chooseSymbols() question is asked (if the user choose human vs computer as the game type, the askWhoGoesFirst() is also asked).  Next the game moves into the play() question which recursively calls itself until a game over condition has been detected.  Finally, control moves to the playAgain() question which either exits the program or resets the game state and calls the startGame() question to begin again.