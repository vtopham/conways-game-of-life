import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game.js'

import colors from './functions/colors.js'

function App() {
  
  const start = {
    'gridSize': 25,
    'cellSize': 15,
    'cellLife': new Array(25 * 25).fill(false),
    
  }
  const [gameState, setGameState] = useState(start)
  const [isRunning, setIsRunning] = useState(false)
  const [freq, setFreq] = useState(1000)
  const [colorScheme, setColorScheme] = useState(colors[0].colors)
  const [stamping, setStamping] = useState(false)
  
  
  return (
    <>
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
    </>
  );
}


export default App;
