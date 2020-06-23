import React, {useEffect} from 'react'
import styled from 'styled-components'




const StyledCanvas = styled.canvas`
    border: 1px solid #000000;

`


const Canvas = props => {
    const {stamping, setStamping, colorScheme, gameState, setGameState, isRunning} = props;

    const gridSize = gameState.gridSize;
    const cellSize = gameState.cellSize;
    const gridLength = gridSize * cellSize;

    useEffect(() => {
        
        const c = document.getElementById("game-canvas");
        const ctx = c.getContext("2d");

        //Clear the canvas
        ctx.clearRect(0,0, gridLength, gridLength)
        //Draw the lines on the grid
        let x = 0;
        let y = 0;
        ctx.strokeStyle = '#464646'
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
        //Shade in boxes if gameState is true (alive)
        for (let i = 0; i < gameState.cellLife.length ; i++) {
            if (gameState.cellLife[i]) {
                const tlX = (i % gridSize) * cellSize;
                const tlY = (Math.floor(i / gridSize)) * cellSize;
                //draw a rectangle with a random color from the scheme
                let rand = Math.floor(Math.random() * colorScheme.length) 
                ctx.fillStyle = colorScheme[rand]
                ctx.fillRect(tlX, tlY, cellSize, cellSize)
            }
        }
    }, [gameState, []])


   

    const clickCell = event => {
        event.preventDefault();
        //if the game is running they can't click the cells
        if (isRunning) {
            return null
        }
        const c = document.getElementById("game-canvas");
        const r = c.getBoundingClientRect();
        

        //These are the offsets for the click event info

        const offsetX = r.x;
        const offsetY = r.y;
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
        //if we're not stamping, just let 'em click
        if (!stamping) {
            const newArr = gameState.cellLife;
            newArr[arrIndex] = !newArr[arrIndex];
            //Toggle the state for that cell
        
            setGameState({
                ...gameState,
                'cellLife': newArr
            })
        } else {
            //check to see if the stamp can fit
            const height = stamping.height
            const width = stamping.width
            const stampMap = stamping.map

            //check the height/width, if invalid warn. Otherwise, draw!
            if (arrIndex + (height - 1) * gridSize > gameState.cellLife.length || arrIndex % gridSize + width > gridSize) {
                alert(`Invalid stamp location. This stamp requires a grid of ${height}h x ${width}w`)
            } else {
                const newArr = gameState.cellLife;
                for (let i = 0; i < stampMap.length; i++) {
                    const indexToMod = arrIndex + (i % width) + (Math.floor(i / width) * gridSize);
                    newArr[indexToMod] = stampMap[i]
                }
                setGameState({
                    ...gameState,
                    'cellLife': newArr
                })
                
            }

            


        }
        
        
    }



    return(
        <>
        <h2>Generation: {gameState.generation} </h2>
        <StyledCanvas id = "game-canvas" width = {gridLength} height = {gridLength} onClick = {clickCell} />
           
        
        </>
    )
}

export default Canvas