import React from "react";
import "./header.css";

export interface HeaderProps {}

export interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  state = {};
  render() {
    return (
      <div className="header">
        <span className="header__name">Player Scoreboard</span>
      </div>
    );
  }
}

export default Header;
