import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game.js'
import Text from './components/Text.js'
import colors from './functions/colors.js'
import styled from 'styled-components'

const StyledApp = styled.div`
  display: flex;
  .game {
    padding: 0 5%;
  } 
  .text {
    width: 30%;
    padding: 10% 5%;
  }


`
function App() {
  
  const start = {
    'gridSize': 25,
    'cellSize': 15,
    'cellLife': new Array(25 * 25).fill(false),
    'generation': 0
    
  }
  const [gameState, setGameState] = useState(start)
  const [isRunning, setIsRunning] = useState(false)
  const [freq, setFreq] = useState(1000)
  const [colorScheme, setColorScheme] = useState(colors[0].colors)
  const [stamping, setStamping] = useState(false)
  
  
  return (
    <StyledApp>
      <div className = "game">
        <Game 
          freq = {freq} 
          setFreq = {setFreq} 
          gameState = {gameState} 
          setGameState = {setGameState} 
          isRunning = {isRunning} 
          setIsRunning = {setIsRunning}
          colorScheme = {colorScheme}
          setColorScheme = {setColorScheme}
          stamping = {stamping}
          setStamping = {setStamping}/>
      </div>
      <div className = "text">
        <Text/>
      </div>
      
    </StyledApp>
    
  );
}


export default App;
