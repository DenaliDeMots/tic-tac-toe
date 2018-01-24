let inquirer = require('inquirer');
let chalk = require('chalk');
let game = require('../ticTacToe');

let typeOfPlayers = '';
let humanGoesFirst = '';
let player1Symbol = '';
let player2Symbol = '';
let player1;
let player2;

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

    inquirer.prompt(questions).then((answers) => {
        setSymbols()
        createPlayerControllers()
        play();

        function setSymbols() {
            player1Symbol = answers.player1Symbol;
            player2Symbol = answers.player2Symbol;
        }

        function createPlayerControllers() {
            let controllers =
                game.startTicTacToeGame(player1Symbol, player2Symbol)
            player1 = controllers.player1
            player2 = controllers.player2
        }
    })

    function onlyOneCharacter(input) {
        if(input.length === 1){
            return true;
        } else if (input.length === 0){
            return 'Please enter a character'
        }
        return 'Please only enter one character'
    }
}

function play() {
    //play tic tac toe game
    let grid = player1.getCurrentGameState()

    console.log(render(grid));

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
    
    let playMove = [{
        type: 'input',
        name: 'move',
        message: 'please choose a row and column'
    }]
    inquirer.prompt(playMove).then((answers) => {
        play();
    })
}

startGame();