import React from 'react';
import Cell from './Cell';
import actionManager from '../actionManager/actionManager';



//the area names represent the indices in a 2d array
//the first number is the Y coordinate, the second is the X

const style = {
    display: 'grid',
    gridTemplateAreas: `
    "C00 C01 C02"
    "C10 C11 C12"
    "C20 C21 C22"`,
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",
    gridColumnGap: '3vmin',
    gridRowGap: '3vmin',
    backgroundColor: 'black'
}

const GameBoard = ({gridArea, cells, board}) => (
    <div style={{...style, gridArea}}>
        {drawCells(board)}
    </div>
)

const drawCells = (board) => {
    const cells = []
    for(let y = 0; y < board.length; y++){
        for(let x = 0; x < board[0].length; x++){
            let key = "C" + y + x;
            let onClick = () => {
                actionManager.playMove({x,y})
            }
            cells.push(<Cell gridArea={key} key={key} mark={board[y][x]}/>)
        }
    }
    return cells
}

export default GameBoard;