import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Title extends Component {
  render() {
    return (
      <NavLink className="navbar-brand" to="/">{ this.props.title }</NavLink>
    );
  }
}
