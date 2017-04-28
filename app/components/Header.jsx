import React from 'react';
import path from 'path';

const Header = ({ progress, currentDate, endDate, imgPath, logos }) => {
  let oneDay = 24 * 60 * 60 * 1000;
  let days = Math.round((endDate.getTime() - currentDate.getTime()) / oneDay);
  logos = logos.map(logo => {
    let aPath = path.join(imgPath, logo);
    return (<img className="logo" key={logo} src={aPath} width="10%"></img>)
  });

  return (
    <div className="jumbotron">
      <h1 className="page-header">Pulse Points Leaderboard{logos}</h1>
      <h2>Current Leader: <span className="bold">SNORLAX</span></h2>
      <h2>Only <span className="bold">{days} days </span> until prizes are announced for Q3!</h2>
    </div>
  );
}

export default Header;