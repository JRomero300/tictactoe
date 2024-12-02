export default function Gameover({ winner, Rematch, hasDraw }) {
  console.log(hasDraw)
  return (
    <div>
      {!hasDraw && (
        <div>
          {winner && (
            <div id="game-over">
              <h2>Game Over!</h2>
              <p>{winner} has won!</p>
              <button onClick={Rematch}>REMATCH!</button>
            </div>
          )}
        </div>
      )}
      {hasDraw && (
        <div id="game-over">
          <h2>DRAW!</h2>
          <button onClick={Rematch}>REMATCH!</button>
        </div>
      )}
    </div>
  );
}
