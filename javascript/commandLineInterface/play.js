let inquirer = require('inquirer');
let chalk = require('chalk');
let game = require('../ticTacToe');

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
        if(answers['game type'] === 'human vs computer'){
            askWhoPlaysFirst()
        } else {
            play();
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
        play();
    })
}



function play() {
    //play tic tac toe game
    let grid = [
        ['X',' ',' '],
        [' ','O',' '],
        ['X',' ','O']
    ]

    console.log(render(grid));

    function render(grid) {
        return ('  A B C \n' + 
            grid.map((row, index) => {
                let coloredRow = row.map((symbol) => {
                    if(symbol === 'X') return chalk.red(symbol);
                    if(symbol === 'O') return chalk.green(symbol);
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