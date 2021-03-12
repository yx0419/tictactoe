import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Square extends React.Component {
  render() {
    return <button onClick={this.props.cb}>{this.props.squareValue}</button>;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOfSquareValues: Array(9).fill(null), //Instead of each Square having its own state, let Board(parent) have all 9 states in one place.  Then parent component can pass the state to children using props. The possible state of Square is one of these three: 'O', 'X', null.
    };
  }

  handleClickInBoard(i) {
    this.state.arrOfSquareValues[i] = "X";
    this.setState({
      arrOfSquareValues: this.state.arrOfSquareValues,
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
    const status = "Next player: X";
    return (
      <div>
        <div className="status">{status}</div>
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
