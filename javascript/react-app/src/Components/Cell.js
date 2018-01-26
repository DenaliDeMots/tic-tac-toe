import React from 'react';

const style = {
    backgroundColor: 'white'
}

const Cell = ({gridArea}) => (
    <div style={{...style, gridArea}}>

    </div>
)

export default Cell;