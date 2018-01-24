let inquirer = require('inquirer');
let chalk = require('chalk');
let game = require('../ticTacToe');

let typeOfPlayers = '';
let humanGoesFirst = '';
let player1Symbol = '';
let player2Symbol = '';
let player1;
let player2;
let currentPlayer;
let gameState;
let playedMoves = []

function startGame() {
    let gameType = [{
        type: 'list',
        name: 'game type',
        message: 'What type of game would you like to play?',
        choices: [
            'human vs human',
            'human vs computer',
            'computer vs computer'
        ]
    }]
    inquirer.prompt(gameType).then((answers) => {
        typeOfPlayers = answers['game type']
        if(answers['game type'] === 'human vs computer'){
            askWhoPlaysFirst()
        } else {
            chooseSymbols();
        }
    })
}

function askWhoPlaysFirst() {
    let whoPlaysFirst = [{
        type: 'list',
        name: 'who goes first',
        message: 'Would you like to go first?',
        choices: [
            'yes',
            'no'
        ]
    }]
    inquirer.prompt(whoPlaysFirst).then((answers) => {
        humanGoesFirst = answers['who goes first'];
        chooseSymbols();
    })
}

function chooseSymbols() {
    let questions;
    if(typeOfPlayers === 'human vs human'){
        questions = [{
            type: 'input',
            name: 'player1Symbol',
            message: 'Player 1, please type a character to be your symbol',
            validate: onlyOneCharacter
        },{
            type: 'input',
            name: 'player2Symbol',
            message: 'Player 2, please type a character to be your symbol',
            validate: onlyOneCharacter
        }]
    } else if (typeOfPlayers === 'human vs computer'){
        questions = [{
            type: 'input',
            name: 'player1Symbol',
            message: (humanGoesFirst === 'yes' ? 
                'Please type a character to be your symbol'
                : "Please type a character to be the computer's symbol"),
            validate: onlyOneCharacter
        },{
            type: 'input',
            name: 'player2Symbol',
            message: (humanGoesFirst === 'no' ? 
            'Please type a character to be your symbol'
            : "Please type a character to be the computer's symbol"),
            validate: onlyOneCharacter
        }]
    } else {
        questions = [{
            type: 'input',
            name: 'player1Symbol',
            message: "Please type a character to be the first computer's symbol",
            validate: onlyOneCharacter
        },{
            type: 'input',
            name: 'player2Symbol',
            message: "Please type a character to be the second computer's symbol",
            validate: onlyOneCharacter
        }]
    }

    inquirer.prompt(questions[0]).then((answers) => {
        player1Symbol = answers.player1Symbol;
        inquirer.prompt(questions[1]).then((answers) => {
            player2Symbol = answers.player2Symbol;
            createPlayerControllers()
            play();

            function createPlayerControllers() {
                let controllers =
                    game.startTicTacToeGame(player1Symbol, player2Symbol)
                player1 = controllers.player1
                player2 = controllers.player2
                currentPlayer = player1;
            }
        })
    })

    function onlyOneCharacter(input) {
        if(input === player1Symbol){
            return 'Character already chosen, please choose another';
        } else if (input.length === 1){
            return true;
        } else if (input.length === 0){
            return 'Please enter a character';
        }
        return 'Please only enter one character';
    }
}

function play() {
    //play tic tac toe game
    let grid = player1.getCurrentGameState()
    let winner = hasWinner()
    let winningPlayer = winner ? getWinningPlayer() : false
    console.log(render(grid));
    if(winner || gameState === 'stalemate'){
        gameOver(winningPlayer)
    } else {
        playNextMove()
    }

    // helper functions
    function playNextMove(){
        inquirer.prompt(playMove()).then((answers) => {
            let move = recordAndConvert(answers.move);
            gameState = currentPlayer.playMove(move);
            switchPlayers();
            play();
        })
    }

    function render(grid) {
        return ('  A B C \n' + 
            grid.map((row, index) => {
                let coloredRow = row.map((symbol) => {
                    if(!symbol) return ' '
                    if(symbol === player1Symbol) return chalk.red(symbol);
                    if(symbol === player2Symbol) return chalk.green(symbol);
                    return symbol;
                })
                return (index + 1) + ' ' + coloredRow.join('|')
            }).join('\n  -+-+- \n') + '\n\n')
    }

    function playMove(){
        return [{
            type: 'input',
            name: 'move',
            message: ((currentPlayer === player1 ? 'Player 1' : 'Player 2')
                + ' please choose a row and column'),
            validate: validateMove
        }]
    }

    function validateMove(move){
        let errorMessage = 'Invalid move. Please place a move like 1A or b3'
        if(move.length !== 2) return errorMessage;
        move = normalizeMove(move)
        if(!moveIsValidCoordinate()) return errorMessage;
        if(playedMoves.includes(move)) return 'That space is already taken'
        return true;

        function moveIsValidCoordinate(){
            let validMoves = [
                '1a', '1b', '1c',
                '2a', '2b', '2c',
                '3a', '3b', '3c'
            ]
            return validMoves.includes(move)
        }
    }
    
    function recordAndConvert (move) {
        move = normalizeMove(move)
        playedMoves.push(move)
        return toMoveObject(move);
    }

    function normalizeMove(move) {
        move = move.toLowerCase()
        if(!firstCharacterIsADigit(move)) move = reverseString(move);
        return move;

        function firstCharacterIsADigit(string) {
            let code = string.charCodeAt(0);
            return code >= 48 && code <= 57
        }

        function reverseString(string){
            return string.split('').reverse().join('')
        }
    }

    function toMoveObject(move) {
        let xConversion = {
            a: 0,
            b: 1,
            c: 2
        }
        let yConversion = {
            1: 0,
            2: 1,
            3: 2
        }
        return {
            x: xConversion[move.slice(1,2)],
            y: yConversion[move.slice(0,1)]
        }
    }

    function switchPlayers() {
        if(currentPlayer === player1){
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function hasWinner() {
        if(!Array.isArray(gameState)) return false;
        return winningLocations();

        function winningLocations() {
            let coordinates = [];
            getHorizintalLocations();
            getVerticalLocations();
            getDiagonalLocations();
            return coordinates;

            function getHorizintalLocations(){
                gameState.map((winObject) => {
                    if(winObject.matchType === 'horizontal match'){
                        coordinates = coordinates.concat([
                            {x: 0,y: winObject.rowIndex},
                            {x: 1,y: winObject.rowIndex},
                            {x: 2,y: winObject.rowIndex}
                        ])
                    }
                })
            }

            function getVerticalLocations(){
                gameState.map((winObject) => {
                    if(winObject.matchType === 'vertical match'){
                        coordinates = coordinates.concat([
                            {x: winObject.columnIndex, y: 0},
                            {x: winObject.columnIndex, y: 1},
                            {x: winObject.columnIndex, y: 2}
                        ])
                    }
                })
            }

            function getDiagonalLocations() {
                gameState.map((winObject) => {
                    if(winObject.matchType === 'diagonal match'){
                        if(winObject.startCorner === 'top left') coordinates = coordinates.concat([
                            {x:0, y:0}, {x:1, y:1}, {x:2, y:2}
                        ])
                        if(winObject.startCorner === 'bottom left') coordinates = coordinates.concat([
                            {x:0, y:2}, {x:1, y:1}, {x:2, y:0}
                        ])
                    }
                })
            }
        }
    }

    function getWinningPlayer() {
        let {x, y} = winner[0]
        return grid[y][x]
    }
}

function gameOver(winningPlayer){
    if(winningPlayer){
        let player = winningPlayer === player1Symbol ? 'Player 1' : 'Player 2'
        console.log(player + ' has won the game!')
        playAgain()
    } else {
        console.log('The game has ended in stalemate')
        playAgain()
    }
}

function playAgain() {
    let shouldPlayAgain = [{
        type: 'list',
        name: 'playAgain',
        message: 'Would you like to play again?',
        choices: [
            'yes',
            'no'
        ]
    }]
    inquirer.prompt(shouldPlayAgain).then((answers) => {
        if(answers.playAgain === 'yes'){
            resetState()
            startGame()
        }
    })

    function resetState() {
        typeOfPlayers = '';
        humanGoesFirst = '';
        player1Symbol = '';
        player2Symbol = '';
        player1 = undefined;
        player2 = undefined;
        currentPlayer = undefined;
        gameState = undefined;
        playedMoves = []
    }
}

startGame();