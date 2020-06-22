import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './components/Game.js'

function App() {
  
  const start = {
    'gridSize': 5,
    'cellSize': 20,
    'cellLife': new Array(10 * 10).fill(0)
  }
  const [gameState, setGameState] = useState(start)
  
  return (
    <>
      <Game gameState = {gameState} setGameState = {setGameState}/>
    </>
  );
}

export default App;
