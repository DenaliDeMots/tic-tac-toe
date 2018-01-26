import React from 'react';
import RedX from './RedX';
import GreenO from './GreenO';

const style = {
    backgroundColor: 'white'
}

const Cell = ({gridArea, mark}) => (
    <div style={{...style, gridArea}}>
        {mark === "X" ? <RedX /> :
            mark === "O" ? <GreenO /> : ""}
    </div>
)

export default Cell;