import React, { Component } from 'react';
import PlayerDetail from '../PlayerDetail/playerDetail';

class ListPlayers extends Component {
  
  render() {
    let listPlayers;
    if(this.props.listPlayers){
        listPlayers = this.props.listPlayers.map(playerDetail => {
        return (
          <PlayerDetail key={playerDetail.title} playerDetail={playerDetail} />
        );
      });
    }
    return (
      <div className="ListPlayers">
        <h3>Highest Scorers!</h3>
        {listPlayers}
      </div>
    );
  }
}

//Validation
ListPlayers.propTypes = {
  listPlayers: React.PropTypes.array
}

export default ListPlayers;
