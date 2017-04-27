import React from 'react';
import Header from './components/Header/header'
import ListPlayers from './components/ListPlayers/listPlayers';
import PlayerDetail from './components/PlayerDetail/playerDetail';
import './index.scss';
import $ from 'jquery';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      listPlayers: []
    }
  }

  componentWillMount() {
    this.getListPlayers();
  }

  getListPlayers() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ listPlayers: data }, function () {
          console.log(this.state);
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    })
  }

  ComponentDidMount() {
    this.getListPlayers();
  }

  render() {
    return (
      <div>
        <Header />
        <ListPlayers listPlayers={this.state.listPlayers} />
      </div>
    )
  }
}
