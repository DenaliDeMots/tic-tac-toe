let inquirer = require('inquirer');
let chalk = require('chalk');
let game = require('../ticTacToe');
let ai = require('../ai/ticTacToe_HardAi')

let typeOfPlayers = '';
let humanGoesFirst = '';
let player1Symbol = '';
let player2Symbol = '';
let player1;
let player2;
let currentPlayer;
let moveResult;
let winner =  false
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
            if(typeOfPlayers === 'computer vs computer'){
                computerFight();
            } else {
                play();
            }

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
    let gameState = player1.getCurrentGameState()
    winner = hasWinner()
    let winningPlayer = winner ? getWinningPlayer() : false
    console.log(render(gameState));
    if(winner || moveResult === 'stalemate'){
        gameOver(winningPlayer)
    } else {
        computerMove()
        if(winner || moveResult === 'stalemate'){
            gameOver(winningPlayer)
        } else {
            playNextMove()
        }
    }

    // helper functions
    function computerMove() {
        if(typeOfPlayers !== 'human vs computer') return;
        let [computer, computerSymbol, humanSymbol] = humanGoesFirst === 'yes' ?
            [player2, player2Symbol, player1Symbol] : 
            [player1, player1Symbol, player2Symbol];
        if(currentPlayer === computer) playComputerMove()

        function playComputerMove() {
            let move = ai.chooseMove(computer.getCurrentGameState(), computerSymbol, humanSymbol);
            playMove();
            checkForWin()
            console.log(render(gameState));
            switchPlayers()

            function playMove() {
                moveResult = computer.playMove(move);
                move = fromMoveObject(move);
                recordAndConvert(move);
                console.log(M(computer)('Computer plays ' + move))
            }

            function checkForWin() {
                gameState = computer.getCurrentGameState()
                winner = hasWinner()
                winningPlayer = winner ? getWinningPlayer() : false
            }
        }
    }

    function playNextMove(){
        inquirer.prompt(playMove()).then((answers) => {
            let move = recordAndConvert(answers.move);
            moveResult = currentPlayer.playMove(move);
            switchPlayers();
            play();
        })
    }

    function M(player){
        if(player === player1) return chalk.red;
        return chalk.green
    }

    function playMove(){
        return [{
            type: 'input',
            name: 'move',
            message: M(currentPlayer)((currentPlayer === player1 ? 'Player 1' : 'Player 2')
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

    function fromMoveObject({x, y}){
        let xConversion = {
            0: 'A',
            1: 'B',
            2: 'C'
        }
        let yConversion = {
            0: 1,
            1: 2,
            2: 3
        }
        return yConversion[y] + xConversion[x]
    }

    function getWinningPlayer() {
        let {x, y} = winner[0]
        return gameState[y][x]
    }
}

function gameOver(winningPlayer){
    if(winningPlayer){
        console.log(winningPlayer + ' has won the game!')
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
        moveResult = undefined;
        winner =  false;
        playedMoves = []
    }
}

function render(grid) {
    return ('  A B C \n' + 
        grid.map((row, y) => {
            let coloredRow = row.map((symbol, x) => {
                if(!symbol) return ' '
                if(symbol === player1Symbol) return P1({x,y})(symbol);
                if(symbol === player2Symbol) return P2({x,y})(symbol);
                return symbol;
            })
            return (y + 1) + ' ' + coloredRow.join('|')
        }).join('\n  -+-+- \n') + '\n\n')
}

function P1(coordinates){
    if(!winner) return chalk.red;
    if(includesCoordinates()){
        return chalk.red.bgWhite
    } else {
        return chalk.red
    }

    function includesCoordinates(){
        return winner.find((coord) =>{
            return coord.x === coordinates.x &&
                coord.y === coordinates.y
        })
    }
}

function P2(coordinates){
    if(!winner) return chalk.green;
    if(includesCoordinates()){
        return chalk.green.bgWhite
    } else {
        return chalk.green
    }

    function includesCoordinates(){
        return winner.find((coord) =>{
            return coord.x === coordinates.x &&
                coord.y === coordinates.y
        })
    }
}

function hasWinner() {
    if(!Array.isArray(moveResult)) return false;
    return winningLocations();

    function winningLocations() {
        let coordinates = [];
        getHorizintalLocations();
        getVerticalLocations();
        getDiagonalLocations();
        return coordinates;

        function getHorizintalLocations(){
            moveResult.map((winObject) => {
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
            moveResult.map((winObject) => {
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
            moveResult.map((winObject) => {
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

function switchPlayers() {
    if(currentPlayer === player1){
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

function computerFight() {
    let playerSymbol = player1Symbol;
    let opponentSymbol = player2Symbol;
    let gameState = currentPlayer.getCurrentGameState();
    console.log(render(gameState));
    fight()

    function fight(){
        move()
        console.log(render(gameState))
        if(victory()){
            gameOver(playerSymbol)
        } else if (stalemate()){
            gameOver(false)
        } else {
            swap()
            setTimeout(fight, 1000)
        }
            
        function move() {
            let move = ai.chooseMove(gameState, playerSymbol, opponentSymbol)
            moveResult = currentPlayer.playMove(move);
            gameState = currentPlayer.getCurrentGameState()
        }

        function swap() {
            switchPlayers();
            switchSymbols();
        }

        function switchSymbols () {
            let swap = playerSymbol;
            playerSymbol = opponentSymbol;
            opponentSymbol = swap;
        }
        
        function victory() {
            return Array.isArray(moveResult)
        }

        function stalemate() {
            return moveResult === 'stalemate'
        }
    }

}

startGame();