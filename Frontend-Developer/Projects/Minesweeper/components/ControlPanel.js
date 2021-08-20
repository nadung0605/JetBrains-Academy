import React, { Component } from "react";
import bomb from "../images/bomb.svg";
import FlagCounter from "./FlagCounter";
import ResetButton from "./ResetButton";
import Timer from "./Timer";

export default class ControlPanel extends Component {
  render() {
    const { flag, gameStatus, resetGame } = this.props;

    return (
      <div className="control-panel">
        <div className="title-row">
          <span className="title">Minesweeper</span>
          <img className="logo" src={bomb} alt="logo" />
        </div>
        <div className="control-row">
          <FlagCounter flag={flag} />
          <ResetButton gameStatus={gameStatus} resetGame={resetGame} />
          <Timer gameStatus={gameStatus} />
        </div>
      </div>
    );
  }
}
