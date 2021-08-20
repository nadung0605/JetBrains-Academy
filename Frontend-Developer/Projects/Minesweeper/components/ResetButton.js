import React, { Component } from "react";

export default class ResetButton extends Component {
  render() {
    // Change icon base on game status
    const { gameStatus, resetGame } = this.props;
    const className = `reset-button ${gameStatus}`;

    return <button className={className} onClick={resetGame}></button>;
  }
}
