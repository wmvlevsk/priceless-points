import React from 'react';
import Header from './components/Header/header'
import Todos from './components/List/list';
import TodoItem from './components/PlayerDetail/playerDetail';
import './index.scss';
import $ from 'jquery';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    }
  }

  componentWillMount() {
    this.getTodos();
  }

  getTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ todos: data }, function () {
          console.log(this.state);
        })
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
      }
    })
  }

  ComponentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        <Header />
        <Todos todos={this.state.todos} />
      </div>
    )
  }
}
