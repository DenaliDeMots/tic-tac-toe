let inquirer = require('inquirer');
let chalk = require('chalk');
let game = require('../ticTacToe');


let background = chalk.bgWhite
let X = chalk.red
let O = chalk.green
let menu = chalk.green

let gameType = [{
    type: 'list',
    name: 'game type',
    message: menu('What type of game would you like to play?'),
    choices: [
        'human vs human',
        'human vs computer',
        'computer vs computer'
    ]
}]

let whoPlaysFirst = [{
    type: 'list',
    name: 'who goes first',
    message: menu('Would you like to go first?'),
    choices: [
        'yes',
        'no'
    ]
}]



inquirer.prompt(gameType).then((answers) => {
    if(answers['game type'] === 'human vs computer'){
        inquirer.prompt(whoPlaysFirst).then((answers) => {
            play();
        })
    }
})

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
                return (index + 1) + ' ' + row.join('|')
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