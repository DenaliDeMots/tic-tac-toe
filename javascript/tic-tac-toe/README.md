This package provides modules for implementing a tic tac toe game.  It contains 6 scripts with corresponding tests.

    ai/
        ticTacToe_HardAi.js) module that takes a 2d array representing a tic tac toe game board and returns an object representing the coordinates of an optimal move.  The ai cannot be beaten.

    controllers/
        sessionController.js) Manages the game session and controls turn taking.
        playerController.js)  Represents a player and provides methods for each player to place their move and get information about the current game state.
        
        Each game session should have a single session controller and a player controller for each player constructed with that session controller.

    gameLogic/
        grid.js)  Provides the underlying data structure for the tic tac toe game.  It represents a grid of items and provides methods for checking if any rows, columns, or diagonals contain matching items.
        ticTacToeGame.js)  Represents the rules of a tic tac toe game.  Its primary method is placeToken which attempts to place a token on the game board at the given coordinate.  If the move is valid it checks for a win condition, otherwise it returns a message stating why the move was invalid.

    ticTacToe.js) This module implements a complete tic tac toe game.  It takes the items to be used as player tokens and creates a session controller for a tic tac toe game with 2 players then creates the 2 player controllers for the session and returns the pair of player controllers.