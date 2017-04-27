import React, { Component } from 'react';
import './header.scss';

export default class Header extends Component {
  render() {
    const img = require('../../assets/cardiogram.png');
    return (
      <div className="header-text">
        <h1>Pulse Points Leaderboard</h1>
        <div className="header-logo"><img src={img}/></div>
      </div>
    )
  }
}
