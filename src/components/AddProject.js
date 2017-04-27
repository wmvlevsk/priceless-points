import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import ProjectItem from './ProjectItem';

import uuid from 'uuid';

class AddProject extends Component {
    constructor(){
        super();
        this.state = {
            newProject:{}
        }
    }
    static defaultProps = {
        categories: ['Web Design', 'Web Dev', 'Mobile']
    }

    handleSubmit(e){
        if(this.refs.title.value === ''){
            alert('you suck');
        } else {
            this.setState({newProject: {
                id: uuid.v4(),
                title: this.refs.title.value,
                category: this.refs.category.value
            }}, function(){
                // console.log(this.state);
                this.props.addProject(this.state.newProject);
            });
        }
        e.preventDefault();
    }
  render() {
      let categoryOptions = this.props.categories.map(category => {
          return <option key={category} value={category}>{category}</option>
      });
    return (
      <div>
        <h3>Add Project</h3>
            <div>
                <label>Title</label><br />
                <input type="text" ref="title" />
            </div>
            <div>
                <label>Category</label><br />
                <select ref="category">
                    {categoryOptions}
                </select>
            </div>
            <div>
                <RaisedButton label="Submit" onClick={this.handleSubmit.bind(this)}/>
            </div>
        <br />
      </div>
    );
  }
}

AddProject.propTypes = {
  categories: React.PropTypes.array,
  addProject: React.PropTypes.func
}

export default AddProject;
