import React from 'react';

export default class TodosForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    let node = this.refs.input;
    this.props.createTodo(node.value);
    node.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="todo-form">
        <input type="text" placeholder="type todo" ref="input" />
        <input type="submit" value="OK!" onClick={this.handleSubmit} />
      </form>
    );
  }
}
