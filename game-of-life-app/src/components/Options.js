import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import colors from '../functions/colors'
import stamps from '../functions/stamps'


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    button {
        background: white;
        border-radius: 5px;
        box-shadow: -3px 3px 5px #D3D3D3;
        border: 1px solid #D3D3D3;

        &:active{
            box-shadow: none;
        }
    }

    .options {
        // background: #D3D3D3;
        border: #D3D3D3;
        margin: 2% 0;
        padding: 2%;
        width: 70%;
        display: flex;
        justify-content: center;
        border-radius: 10px;
        p {

        }
        select {
            margin: 0 2%;
            height: 100%;
            align-self: center;
            border-radius: 5px;
            font-size: 1 rem;
            padding: 1%;
        }
        button {
            height: 75%;
            align-self: center;
        }
        
    }
    .stamps {
        flex-direction: column;
        align-items: center;
        * {
            margin: 2% 0;
        }
    }

    .start-stop {
        display: flex;
        justify-content: space-around;
        width: 70%;
        button {
            margin: 2%;
            padding: 2%;
            width: 100%;
        }
        
    }

    .inactive {
        color: white;
        background: #D3D3D3;
        box-shadow: none;
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
            'generation': 0
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

    const step = () => {
        if(!isRunning) {
            gameLoop()
        }
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
            'cellLife': newArr,
            'generation': gameState.generation + 1
        })

    }

    const sumOfAll = gameState.cellLife.reduce((a, b) => a + b, 0)
    return(
        <StyledDiv>
            <h3>Controls</h3>
            <div className = "start-stop">
                
                {sumOfAll === 0 ? 
                <button className = "inactive" onClick = {clearGame}>Clear</button>: 
                <button onClick = {clearGame}>Clear</button>
                } 
                {isRunning ? 
                <button className = "inactive" onClick = {startGame}>Start</button> :
                <button onClick = {startGame}>Start</button>
                }
                {isRunning ? 
                <button className = "inactive" nClick = {step}>Step</button> :
                <button onClick = {step}>Step</button>
                }
                {isRunning ? 
                <button onClick = {stopGame}>Stop</button> :
                <button className = "inactive" onClick = {stopGame}>Stop</button>
                }
                
                
            </div>
            
            <h3>Options</h3>
            <div className = "stamps options">
                <p>Choose a stamp:</p>
                <select name = "stamps" id = "stamps" onChange = {changeStamp}>
                    <option value = {false}>None</option>
                    {stamps.map((stamp, index) => {
                        return <option value = {index}>{stamp.name}</option>
                    })}
                </select>
                <button onClick = {cancelStamp}>Cancel Stamp</button>
            </div>
            <div className = "color-schemes options">
                <p>Change color scheme:</p>
                <select name = "colors" id = "colors" onChange = {changeColor}>
                    {colors.map(scheme => {
                        return <option value = {scheme.colors}>{scheme.name}</option>
                    })}
                </select>
            </div>
            <div className = "size-select options">
                <p>Change grid size:</p>
                <select name = "sizes" id = "sizes" onChange = {changeSize}>
                    <option value = "25">25 x 25</option>
                    <option value = "30">30 x 30</option>
                    <option value = "35">35 x 35</option>

                </select>
            </div>
            <div className = "set-speed options">
                <p>Select a speed: </p>
                <select name = "speeds" id = "speeds" onChange = {changeSpeed}>
                    <option value = "1000">1 frame/second</option>
                    <option value = "500">1 frame / .5 seconds</option>
                    <option value = "250">1 frame / .25 seconds</option>
                    <option value = "100">1 frame / .1 seconds</option>
                </select>
            </div>
            
        </StyledDiv>
    )
}

export default Options