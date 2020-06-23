import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Canvas from './Canvas'
import Options from './Options'



const StyledGameDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;


`

const Game = props => {
    const {stamping, setStamping, colorScheme, setColorScheme,freq, setFreq, gameState, setGameState, isRunning, setIsRunning} = props;

    return(
        <StyledGameDiv >
            {/* <Header /> */}
            <Canvas 
        stamping = {stamping}
        setIsStamping = {setStamping} colorScheme = {colorScheme} isRunning = {isRunning} gameState = {gameState} setGameState = {setGameState}/>
            <Options 
        stamping = {stamping}
        setStamping = {setStamping} colorScheme = {colorScheme} setColorScheme = {setColorScheme} freq = {freq} setFreq = {setFreq} isRunning = {isRunning} setIsRunning = {setIsRunning} gameState = {gameState} setGameState = {setGameState}/>
        </StyledGameDiv>
    )
}

export default Game