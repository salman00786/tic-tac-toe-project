import { useState } from "react"
import GameBoard from "./components/gameBoard"
import Player from "./components/player"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if( gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O";
  }

  return currentPlayer;
}



function App() {

  const [player,  setPlayer] = useState({"X" : "Player 1", "O" : "Player 2"})
  
  const [gameTurns, setGameTurns] = useState([]);
  

const currentActivePlayer = deriveActivePlayer(gameTurns);


let gameBoard = [...initialGameBoard.map(array => [...array])];

for(const turn of gameTurns){

    const {square , player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
}

let winner;

for(const combinations of WINNING_COMBINATIONS){
  const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
  const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
  const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
  }
}

const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{square: {row : rowIndex, col : colIndex}, player : currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
    
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer(prevPlayers => {
      return {
      ...prevPlayers,
      [symbol]: newName
  }})
  }

  return (
    <main>
      <div id="game-container">
          <ol id="players" className="highlight-player">
              <Player initialName={"Player 1"} symbol={"X"} isActive = {currentActivePlayer === "X"} onChangeName = {handlePlayerNameChange}/>
              <Player initialName={"Player 2"} symbol={"O"} isActive={currentActivePlayer === "O"} onChangeName = {handlePlayerNameChange}/>
          </ol>
            {(winner || hasDraw) && <GameOver winner ={winner} onRestart={handleRestart}/>}
          <GameBoard onSelectSquare = {handleSelectSquare} board = {gameBoard}/>
          
      </div>
      <Log turns={gameTurns}/>
      
    </main>
  )
}

export default App
