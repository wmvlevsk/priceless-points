import React, { Component } from 'react';

class PlayerDetail extends Component {
  render() {
    return (
      <li className="PlayerDetail">
        <strong>{this.props.playerDetail.title}</strong>
      </li>
    );
  }
}

PlayerDetail.propTypes = {
  playerDetail: React.PropTypes.object
}
export default PlayerDetail;