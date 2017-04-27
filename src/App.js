import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Projects from './components/Projects';
import AddProject from './components/AddProject';
import Todos from './components/Todos';
import TodoItem from './components/TodoItem';
import uuid from 'uuid';
import $ from 'jquery';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  componentWillMount() {
    this.getProjects();
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

  handleAddProject(project) {
    let projects = this.state.projects;
    projects.push(project);
    this.setState({ projects: projects });
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({ projects: projects });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Busnatch',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social',
          category: 'Mobile Dev'
        },
        {
          id: uuid.v4(),
          title: 'ECOMMERCE',
          category: 'Web Dev'
        }
      ]
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AddProject addProject={this.handleAddProject.bind(this)} />
          <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
          <hr />
          <Todos todos={this.state.todos} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
