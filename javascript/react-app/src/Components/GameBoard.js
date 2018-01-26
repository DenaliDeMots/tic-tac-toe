import React from 'react';
import Cell from './Cell';


//the area names represent the indices in a 2d array
//the first number is the Y coordinate, the second is the X

const style = {
    display: 'grid',
    gridTemplateAreas: `
    "00" "01" "02"
    "10" "11" "12"
    "20" "21" "22"`,
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr"
}

const GameBoard = ({gridArea, cells, board}) => (
    <div style={{...style, gridArea}}>
        {drawCells(board)}
    </div>
)

const drawCells = (board) => {
    const cells = []
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            let key = "" + i + j;
            cells.push(<Cell gridArea={key} key={key} />)
        }
    }
    return cells
}

export default GameBoard;