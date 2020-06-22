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

    useEffect(() => {
        const c = document.getElementById("game-canvas");
        const ctx = c.getContext("2d");
        //Shade in boxes if gameState is true (alive)
        for (let i = 0; i < gameState.cellLife.length ; i++) {
            if (gameState.cellLife[i]) {
                const tlX = (i % gridSize) * cellSize;
                const tlY = (Math.floor(i / gridSize)) * cellSize;
                //draw a rectangle
                console.log(`The cooordinates are x: ${tlX} and y: ${tlY}`)
                ctx.fillRect(tlX, tlY, cellSize, cellSize)
            }
        }
    })

    const clickCell = event => {
        event.preventDefault();
        const c = document.getElementById("game-canvas")
        //These are the offsets for the click event info
        const offsetX = c.offsetLeft
        const offsetY = c.offsetTop
        
        //These are the values as supplied by the click event
        const clickX = event.clientX;
        const clickY = event.clientY;

        //These are the true relative coordinates on the canvas
        const pixelX = clickX - offsetX
        const pixelY = clickY - offsetY
        

        //This is the cell number of what was clicked (From top-left)
        const x = Math.floor(pixelX / cellSize)
        const y = Math.floor(pixelY / cellSize)
        

        //This is the array index in state of the cell that was clicked
        const arrIndex = x + y * gridSize
        console.log(`user clicked ${arrIndex}`)
        const newArr = gameState.cellLife;
        newArr[arrIndex] = !newArr[arrIndex];
        //Toggle the state for that cell
        //TODO: make this cleaner
        setGameState({
            ...gameState,
            'cellLife': newArr
        })
        
    }

    return(
        <>
        <h2>This is where the canvas will go</h2>
        <StyledCanvas id = "game-canvas" width = {gridLength} height = {gridLength} onClick = {clickCell}>
           
        </StyledCanvas>
        </>
    )
}

export default Canvas