import React, { Component } from 'react';
import Contact from "../Contact/Contact";
import './Sidebar.scss';
import { NavLink } from "react-router-dom";

export default class Sidebar extends Component {
  render() {
    return (
      <NavLink to='/contact'>
        <Contact scale={ 0.7 }/>
      </NavLink>
    );
  }
}