import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: this.props.value,
    };
  }
  handleClickBtn() {
    this.setState({
      val: "X",
    });
  }
  render() {
    console.log("render() in Square component"); //3

    return (
      <button
        className="square"
        onClick={() => {
          this.handleClickBtn();
        }}
      >
        {this.state.val}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />; //pass prop from Board (=parent component) to Square (=child component).
  }
  render() {
    console.log("render() in Board component"); //2
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
    console.log("render() in Game component"); //1
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
