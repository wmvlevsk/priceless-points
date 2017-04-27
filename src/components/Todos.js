import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {
  render() {
    let todoItems;
    if(this.props.todos){
        todoItems = this.props.todos.map(todo => {
        return (
          <TodoItem key={todo.title} todo={todo} />
        );
      });
    }
    return (
      <div className="Todos">
        <h3>Latest Todos</h3>
        {todoItems}
      </div>
    );
  }
}

//Validation
Todos.propTypes = {
  todos: React.PropTypes.array
}

export default Todos;
