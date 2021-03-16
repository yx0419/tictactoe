import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return <button onClick={props.cb}>{props.squareValue}</button>;
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        squareValue={this.props.lastArr[i]}
        cb={() => this.props.cbb(i)}
      />
    ); //pass prop from Board (=parent component) to Square (=child component).
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          arrOfSquareValues: Array(9).fill(null),
        },
      ],
      isCurrentTurnX: true,
    };
  }

  handleClick(i) {
    const lastArr = this.state.history[this.state.history.length - 1]
      .arrOfSquareValues;
    if (calculateWinner(lastArr) || lastArr[i]) {
      return; //ignore click
    }

    //Not mutating the existing array. Just create a new copy of the existing array. => to store history of moves
    const copyArr = lastArr.slice();
    copyArr[i] = this.state.isCurrentTurnX ? "X" : "O";

    this.state.history.push({
      arrOfSquareValues: copyArr,
    });

    this.setState({
      history: this.state.history,
      isCurrentTurnX: !this.state.isCurrentTurnX,
    });
  }

  render() {
    const lastArr = this.state.history[this.state.history.length - 1]
      .arrOfSquareValues; //the last element in array 'history'.

    let result = "Next player is " + (this.state.isCurrentTurnX ? "X" : "O");
    //console.log(lastArr);
    let w = calculateWinner(lastArr);
    if (w) {
      result = "Winner is " + w;
    } else {
      let nArr = lastArr.filter((x) => x === null);
      if (nArr.length === 0) {
        result = "No Winner, all filled";
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board lastArr={lastArr} cbb={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{result}</div>
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
