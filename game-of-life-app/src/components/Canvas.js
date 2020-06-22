import React, {useEffect} from 'react'
import styled from 'styled-components'



const StyledCanvas = styled.canvas`
    border: 1px solid #000000;

`


const Canvas = props => {
    const {gameState, setGameState} = props;

    const gridSize = gameState.gridSize;
    const cellSize = gameState.cellSize;
    const gridLength = gridSize * cellSize;

    useEffect(() => {
        //Draw the lines on the grid
        const c = document.getElementById("game-canvas");
        const ctx = c.getContext("2d");
        let x = 0;
        let y = 0;
        while (x < gridLength) {
            x += cellSize;
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gridLength);
            ctx.stroke();
        }
        while (y < gridLength) {
            y += cellSize;
            ctx.moveTo(0, y)
            ctx.lineTo(gridLength, y);
            ctx.stroke();
        }
    },[])

    return(
        <>
        <h2>This is where the canvas will go</h2>
        <StyledCanvas id = "game-canvas" width = {gridLength} height = {gridLength}>
           
        </StyledCanvas>
        </>
    )
}

export default Canvas