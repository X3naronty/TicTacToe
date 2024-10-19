import { useState } from 'react';

function Square({value, onClick}) {
  return <button onClick={onClick} className="square">{value}</button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({isTic, squares, onPlay}) {

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (isTic ? "X" : "O");
  }

  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)) {
      return;
    }
   const newSquares = squares.slice();
    newSquares[i] = isTic ? 'X' : 'O';
    onPlay(newSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square className="square" value={squares[0]} onClick={() => handleClick(0)}/>
        <Square className="square" value={squares[1]} onClick={() => handleClick(1)}/>
        <Square className="square" value={squares[2]} onClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square className="square" value={squares[3]} onClick={() => handleClick(3)}/>
        <Square className="square" value={squares[4]} onClick={() => handleClick(4)}/>
        <Square className="square" value={squares[5]} onClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square className="square" value={squares[6]} onClick={() => handleClick(6)}/>
        <Square className="square" value={squares[7]} onClick={() => handleClick(7)}/>
        <Square className="square" value={squares[8]} onClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentState = history[currentMove];
  const isTic = !(currentMove % 2);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  } 

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game__board">
        <Board isTic={isTic} squares={currentState} onPlay={handlePlay}/>
      </div>
      <div className="game__info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}
