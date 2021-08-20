import React, { Component } from "react";

export default class Cell extends Component {
  // Click handler
  open = (id) => {
    this.props.clickHandler(id);
  };

  // Right click handler
  mark = (e, id) => {
    e.preventDefault();

    this.props.rightClickHandler(id);
  };

  render() {
    const { id, minesAround, status, isMine } = this.props.cell;
    let className = "cell ";
    let content = null;

    // Display the cell base on status
    if (status === "opened") {
      className += isMine ? "fired" : "opened";
      content = !isMine && minesAround !== 0 ? minesAround : null;
    } else if (status === "flagged") {
      className += "target";
    }

    return (
      <div
        className={className}
        onClick={() => this.open(id)}
        onContextMenu={(e) => this.mark(e, id)}
      >
        {content}
      </div>
    );
  }
}
