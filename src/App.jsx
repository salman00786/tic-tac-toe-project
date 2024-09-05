import { useState } from "react"
import GameBoard from "./components/gameBoard"
import Player from "./components/player"
import Log from "./components/Log";
function App() {

  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex){
    setActivePlayer((curActivePlayer => curActivePlayer === "X" ? "O" : "X"));
    setGameTurns(prevTurns => {
      let currentPlayer = "X";

      if( prevTurns.length > 0 && prevTurns[0].player === "X"){
        currentPlayer = "O";
      }
      const updatedTurns = [{square: {row : rowIndex, col : colIndex}, player : currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName={"Player 1"} symbol={"X"} isActive = {activePlayer === "X"}/>
              <Player initialName={"Player 2"} symbol={"O"} isActive={activePlayer === "O"}/>
          </ol>

          <GameBoard onSelectSquare = {handleSelectSquare} activePlayerSymbol = {activePlayer}/>
          <Log/>
      </div>

      LOG
    </main>
  )
}

export default App
