import Player from "./Components/player";
import GameBoard from "./Components/GameBoard";
import Log from "./Components/log";
import { useState } from "react";
import { winningCombinations } from "./winning-combinations";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winnerName;
  //Check combinations for winnder
  for (const winningCombo of winningCombinations) {
    const firstSymbol = gameBoard[winningCombo[0].row][winningCombo[0].column];
    const secondSymbol = gameBoard[winningCombo[1].row][winningCombo[1].column];
    const thirdSymbol = gameBoard[winningCombo[2].row][winningCombo[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winnerName = players[firstSymbol];
    }
  }
  return winnerName;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winnerName = deriveWinner(gameBoard, players);
 
  const hasDraw = gameTurns.length == 9 && !winnerName;

  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  function onRematch() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={'X'}
            isActivePlayer={activePlayer === 'X'}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol={'O'}
            isActivePlayer={activePlayer === 'O'}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winnerName || hasDraw) && (
          <GameOver winner={winnerName} Rematch={onRematch} hasDraw={hasDraw} />
        )}
        <GameBoard onSelectSquare={handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
