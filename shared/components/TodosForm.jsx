import React from 'react';

export default class TodosForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let node = this.refs['todo-input'].getDOMNode();

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="todo-form">
        <input type="text" placeholder="type todo" ref="todo-input" />
        <input type="submit" value="OK!" onClick={this.handleSubmit} />
      </form>
    );
  }
}
