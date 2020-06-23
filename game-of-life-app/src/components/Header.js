import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
    margin: 2% 0;
    display: flex;
    justify-content: center

`

const Header = () => {

    return(
        <StyledDiv>
            <h1>Welcome To Conway's Game Of Life</h1>
        </StyledDiv>
    )
}

export default Header