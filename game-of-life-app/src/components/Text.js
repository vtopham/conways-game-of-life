import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`

    background: peachpuff;
    padding: 2% 4%;
    border-radius: 5px;
    color: #464646;

`

const Text = props => {
    return(
        <StyledDiv>
            <section>
                <h3>Life And Death</h3>
                <p>The rules are simple:</p>
                <ul>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ul>
                <p>In this simulation, we assume all cells outside the edge of the grid are "dead".</p>
                <p>To get started, try clicking some cells to make them come to life. Or, use the stamp option to add groupings of live cells with peculiar behavior. When you're ready, start the simulation. You can also step through it if you would like!</p>
            </section>
            <section>
                <h3>About The Game Of Life</h3>
                <p>Conway's game of life is a cellular automaton that was invented by John Conway in 1970. This game requies 0 players to play as its progression is determined by its initial state.</p>
                <p>Cellular automatons are models studied in automata theory. They consist of a grid of cells with a finite number of states such as "on" or "off".</p>
            </section>
        </StyledDiv>
    )
}

export default Text