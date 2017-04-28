import React, { Component } from 'react';
import PlayerDetail from '../PlayerDetail/playerDetail.jsx';

class ListPlayers extends Component {

  render() {
    let listPlayers;
    let truncListPlayers;
    if(this.props.listPlayers){
        listPlayers = this.props.listPlayers.map(playerDetail => {
        return (
          <PlayerDetail key={playerDetail.title} playerDetail={playerDetail} />
        );
      });
      truncListPlayers = [];
      for (var i=0; i < 4; i++){
          truncListPlayers.push(listPlayers[i]);
      }
      console.log(truncListPlayers);
    }
    return (
      <div className="ListPlayers">
        <h3>Highest Scorers!</h3>
        {truncListPlayers}
      </div>
    );
  }
}

//Validation
ListPlayers.propTypes = {
  listPlayers: React.PropTypes.array
}

export default ListPlayers;