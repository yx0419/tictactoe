import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return <button onClick={props.cb}>{props.squareValue}</button>;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOfSquareValues: Array(9).fill(null), //Instead of each Square having its own state, let Board(parent) have all 9 states in one place.  Then parent component can pass the state to children using props. The possible state of Square is one of these three: 'O', 'X', null.
      isCurrentTurnX: true,
    };
  }

  handleClickInBoard(i) {
    if (
      calculateWinner(this.state.arrOfSquareValues) ||
      this.state.arrOfSquareValues[i]
    ) {
      return;
    }
    this.state.arrOfSquareValues[i] = this.state.isCurrentTurnX ? "X" : "O";
    this.setState({
      arrOfSquareValues: this.state.arrOfSquareValues,
      isCurrentTurnX: !this.state.isCurrentTurnX,
    });
  }

  renderSquare(i) {
    return (
      <Square
        squareValue={this.state.arrOfSquareValues[i]}
        cb={() => this.handleClickInBoard(i)}
      />
    ); //pass prop from Board (=parent component) to Square (=child component).
  }
  render() {
    let s = this.state.isCurrentTurnX ? "X" : "O";
    let result = "Next player is " + s;

    let r = calculateWinner(this.state.arrOfSquareValues);

    //let count = 0; //I tried this to check if game is over without winner (all filled), but this won't work because every time user clicks square btn, count will be set to zero again, never can become 9.
    if (r) {
      //if r is not null
      result = "Winner is " + r;
    } else {
      //if r is null
      let nArr = this.state.arrOfSquareValues.filter((x) => x === null);
      if (nArr.length === 0) {
        //if 9 values are all non-null, (to know this, use filter method and check if the new array's length is zero)
        result = "No Winner, all filled";
      }
    }

    return (
      <div>
        <div className="status">{result}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{}</div>
          <ol>{}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(arrOfSquareValues) {
  const arrOfWinning = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < arrOfWinning.length; i++) {
    const [a, b, c] = arrOfWinning[i];

    if (
      //if these three values are all same,
      arrOfSquareValues[a] === arrOfSquareValues[b] &&
      arrOfSquareValues[b] === arrOfSquareValues[c]
    ) {
      let winner = arrOfSquareValues[a]; //then it means there is winner.
      return winner;
    }
  }
  return null;
}
