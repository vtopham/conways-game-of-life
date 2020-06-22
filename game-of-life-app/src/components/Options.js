import React from 'react'
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
    const {gameState, setGameState} = props

    const changeSize = event => {
        event.preventDefault();
        const size = event.target.value
        setGameState({
            ...gameState,
            'gridSize': size,
            'cellLife': new Array(size * size).fill(false),
            'running': false
        }
        )
    }

    const startGame = event => {
        event.preventDefault();
        if(gameState.running) {
            return null;
        }

        setGameState({
            ...gameState,
            'running': true
        })



    }

    const gameLoop = () => {
        const curArr = gameState.cellLife
        const size = gameState.gridSize
        const newArr = curArr.map((cell, index) => {
            //get the number of live cells
            let neighbors = 0
            //top row!
            if (index >= size) {
                //if there is a top left
                if (index % size != 0) {
                    if (curArr[index - size - 1]) {
                        neighbors += 1
                    }
                }
                //if there is a top middle
                if (curArr[index - size]) {
                    neighbors += 1
                }
                //if there is a top right
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
            

            return neighbors
        })
        console.log(newArr)

    }

    return(
        <StyledDiv>
            <h2>Options</h2>
            <div className = "size-select">
                <p>Select a size:</p>
                <select name = "sizes" id = "sizes" onChange = {changeSize}>
                    <option value = "5">5 x 5</option>
                    <option value = "6">6 x 6</option>
                    <option value = "7">7 x 7</option>
                    <option value = "8">8 x 8</option>
                    <option value = "9">9 x 9</option>
                    <option value = "10">10 x 10</option>
                </select>
            </div>
            <div className = "start-stop">
                <button onClick = {startGame}>Start</button>
                <button onClick = {gameLoop}>Stop</button>
            </div>
        </StyledDiv>
    )
}

export default Options