import React, { Component } from "react";

export default class FlagCounter extends Component {
  render() {
    return <div className="flag-counter">{this.props.flag}</div>;
  }
}
