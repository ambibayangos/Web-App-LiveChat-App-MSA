import React, { Component } from "react";
import "./header.css";
import Logo from "./Logo/logo";
import AddVideoButton from "./AddVideoButton/addVideoButton";

class Header extends Component {
  state = {};
  render() {
    return (
      <div className="header-container">
        <Logo />
        <span className="spacer" />
        <AddVideoButton />
      </div>
    );
  }
}

export default Header;
