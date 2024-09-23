import { useState } from "react"
import GameBoard from "./components/gameBoard"
import Player from "./components/player"
import Log from "./components/Log";


function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if( gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O";
  }

  return currentPlayer;
}


function App() {

  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

const currentActivePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer => curActivePlayer === "X" ? "O" : "X"));
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row : rowIndex, col : colIndex}, player : currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName={"Player 1"} symbol={"X"} isActive = {currentActivePlayer === "X"}/>
              <Player initialName={"Player 2"} symbol={"O"} isActive={currentActivePlayer === "O"}/>
          </ol>

          <GameBoard onSelectSquare = {handleSelectSquare} turns = {gameTurns}/>
          
      </div>
      <Log turns={gameTurns}/>
      
    </main>
  )
}

export default App
