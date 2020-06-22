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
    const {gameState, setGameState} = props;

    return(
        <StyledGameDiv >
            <Header />
            <Canvas gameState = {gameState} setGameState = {setGameState}/>
            <Options gameState = {gameState} setGameState = {setGameState}/>
        </StyledGameDiv>
    )
}

export default Game