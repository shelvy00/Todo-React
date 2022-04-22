import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTodos } from '../../actions';


class   TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  renderAdmin = (todo) => {
    if (todo.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/todos/edit/${todo.id}`} className="ui button teal">Edit</Link>
          <Link to={`/todos/delete/${todo.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  };

  renderList = () => {
    console.log(this.props.todos)
     return this.props.todos.map(todo => {
      return (
        <div className="item" key={todo.id}>
           {this.renderAdmin(todo)}
           <i className="large middle aligned icon camera" />
           <div className="content">
             {todo.title}
             <div className="description">{todo.description}</div>
           </div>
        </div>
      )
     });
  };

  renderCreate = () => {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign:'right' }}>
          <Link to="/todos/new" className="ui button green">
          Create Todo
          </Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h2>todos</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { todos: Object.values(state.todos), currentUserId: state.auth.userId, isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { fetchTodos }) (TodoList);
