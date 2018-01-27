import React from 'react';
import RedX from './RedX';
import GreenO from './GreenO';

const style = {
    backgroundColor: 'white'
}

const Cell = ({gridArea, mark, onClick}) => (
    <div style={{...style, gridArea}} onClick={onClick}>
        {mark === "X" ? <RedX /> :
            mark === "O" ? <GreenO /> : ""}
    </div>
)

export default Cell;