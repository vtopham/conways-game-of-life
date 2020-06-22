import React, {useEffect, useState} from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    .size-select{
        width: 100%;
        display: flex;
        justify-content: center;

        p {
            margin-right: 2%;
        }
    }

    .start-stop {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
            margin: 2% 2%;
        }
    }
`

const Options = props => {

    
    const {gameState, setGameState, isRunning, setIsRunning} = props;

   
    useEffect(() => {
        if(isRunning){
            setTimeout(() => {
                gameLoop()
            }, gameState.freq)
            
        }
    },[gameState, isRunning])
    
    const startGame = event => {
        event.preventDefault();
        
            setIsRunning(true)
        
    }

    const stopGame = event => {
        event.preventDefault();
        setIsRunning(false)
        
    }

    const changeSize = event => {
        event.preventDefault();
        const size = event.target.value
        setIsRunning(false)
        setTimeout(() => {
            setGameState({
                ...gameState,
                'gridSize': size,
                'cellLife': new Array(size * size).fill(false),
            })
        },gameState.freq + 1)
        
        
        
    }

    const clearGame = event => {
        event.preventDefault();
        const size = gameState.gridSize;
        setTimeout(() => {
            setGameState({
                ...gameState,
                'cellLife': new Array(size * size).fill(false),
            })
        }, gameState.freq + 1)
        setIsRunning(false)
    }


    const gameLoop = () => {
        console.log("Game looping!")
        const curArr = gameState.cellLife
        const size = gameState.gridSize

        
        const newArr = curArr.map((cell, index) => {
            //get the number of live cells, or "neighbors"
            let neighbors = 0
            //top row!
            if (index >= size) {
                if (index % size != 0) {
                    if (curArr[index - size - 1]) {
                        neighbors += 1
                    }
                }
                if (curArr[index - size]) {
                    neighbors += 1
                }
                if (index % size != size - 1) {
                    if (curArr[index - size + 1]) {
                        neighbors += 1
                    }
                }
            }
            //middle
            if (index % size != 0) {
                if (curArr[index - 1]) {
                    neighbors += 1
                }
            }
            if (index % size != size - 1) {
                if (curArr[index + 1]) {
                    neighbors += 1
                }
            }

            //bottom
            if (index < size * (size - 1)) {
                if (index % size != 0) {
                    if (curArr[index + size - 1]){
                        neighbors += 1
                    }
                }
                if(curArr[index + size]) {
                    neighbors += 1
                }
                if (index % size != size - 1) {
                    if (curArr[index + size + 1]) {
                        neighbors += 1
                    }
                }
            }
            
            if (neighbors > 3) {
                return false;
            } else if (curArr[index] == false) {
                if (neighbors == 3) {
                    return true;
                } else {
                    return false;
                }
            } else if (neighbors > 1) {
                return true;
            } else {
                return false;
            }
        })
        
        setGameState({
            ...gameState,
            'cellLife': newArr
        })

    }

    return(
        <StyledDiv>
            <h2>Options</h2>
            <div className = "size-select">
                <p>Select a size:</p>
                <select name = "sizes" id = "sizes" onChange = {changeSize}>
                    <option value = "25">25 x 25</option>
                    <option value = "30">30 x 30</option>
                    <option value = "35">35 x 35</option>

                </select>
            </div>
            <div className = "start-stop">
                <button onClick = {clearGame}>Clear</button>
                <button onClick = {startGame}>Start</button>
                <button onClick = {gameLoop}>Step</button>
                <button onClick = {stopGame}>Stop</button>
            </div>
        </StyledDiv>
    )
}

export default Options