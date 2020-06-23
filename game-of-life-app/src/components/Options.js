import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import colors from '../functions/colors'
import stamps from '../functions/stamps'


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

    
    const {stamping, setStamping, colorScheme, setColorScheme, gameState, setGameState, isRunning, setIsRunning, freq, setFreq} = props;
    let globalTimeoutID = null;
    
   
    useEffect(() => {
        if(isRunning){
            globalTimeoutID = setTimeout(() => {
                gameLoop()
            }, freq)
            
        }
    },[gameState, isRunning])
    
    const startGame = event => {
        event.preventDefault();
        setIsRunning(true)
    }

    const stopGame = event => {
        event.preventDefault();
        clearTimeout(globalTimeoutID)
        setIsRunning(false)
        
    }

    const changeSize = event => {
        event.preventDefault();
        const size = event.target.value
        clearTimeout(globalTimeoutID)
        setIsRunning(false)
        setGameState({
            ...gameState,
            'gridSize': size,
            'cellLife': new Array(size * size).fill(false),
        })
        
    }

    const changeSpeed = event => {
        event.preventDefault();
        const speed = event.target.value
        setFreq(speed)
    }

    const clearGame = event => {
        event.preventDefault();
        const size = gameState.gridSize;
        setIsRunning(false);
        clearTimeout(globalTimeoutID)
        setGameState({
            ...gameState,
            'cellLife': new Array(size * size).fill(false),
        })
        noStamp()
        
        
    }

    const changeColor = event => {
        event.preventDefault();
        const scheme = event.target.value.split(',');
        setColorScheme(scheme)
    }

    const changeStamp = event => {
        event.preventDefault();
        const index = event.target.value;
        if(!index){
            setStamping(false)
        } else {
            setStamping(stamps[index])
        }
        
    }

    const cancelStamp = event => {
        event.preventDefault();
        noStamp()
    }

    const noStamp = () => {
        setStamping(false)
        const dropdown = document.getElementById("stamps")
        console.log(dropdown)
        dropdown.value = dropdown[0].value
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
            <div className = "stamps">
                <p>Select a stamp</p>
                <select name = "stamps" id = "stamps" onChange = {changeStamp}>
                    <option value = {false}>None</option>
                    {stamps.map((stamp, index) => {
                        return <option value = {index}>{stamp.name}</option>
                    })}
                </select>
                <button onClick = {cancelStamp}>Cancel Stamp</button>
            </div>
            <div className = "color-schemes">
                <p>Select color scheme:</p>
                <select name = "colors" id = "colors" onChange = {changeColor}>
                    {colors.map(scheme => {
                        return <option value = {scheme.colors}>{scheme.name}</option>
                    })}
                </select>
            </div>
            <div className = "size-select">
                <p>Select a size:</p>
                <select name = "sizes" id = "sizes" onChange = {changeSize}>
                    <option value = "25">25 x 25</option>
                    <option value = "30">30 x 30</option>
                    <option value = "35">35 x 35</option>

                </select>
            </div>
            <div className = "set-speed">
            <select name = "speeds" id = "speeds" onChange = {changeSpeed}>
                    <option value = "1000">1 frame/second</option>
                    <option value = "500">1 frame / .5 seconds</option>
                    <option value = "250">1 frame / .25 seconds</option>
                    <option value = "100">1 frame / .1 seconds</option>
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