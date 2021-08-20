import React, { Component } from "react";
import Cell from "./Cell";

export default class Field extends Component {
  render() {
    const { field, clickHandler, rightClickHandler } = this.props;

    const listOfCells = field.map((cell) => (
      <Cell
        key={cell.id}
        cell={cell}
        clickHandler={clickHandler}
        rightClickHandler={rightClickHandler}
      />
    ));

    return <div className="field">{listOfCells}</div>;
  }
}
