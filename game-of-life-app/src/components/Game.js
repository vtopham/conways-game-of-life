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

const Game = () => {
    return(
        <StyledGameDiv >
            <Header />
            <Canvas />
            <Options />
        </StyledGameDiv>
    )
}

export default Game