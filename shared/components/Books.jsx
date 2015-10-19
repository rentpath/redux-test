import React from 'react';
import { bindActionCreators } from 'redux';
import BooksList from 'components/BooksList';
import * as BookActions from 'actions/BookActions';
import { connect } from 'react-redux';

@connect(state => ({ books: state.books }))

export default class Books extends React.Component {
  render() {
    const { books, dispatch } = this.props;

    return (
      <div id="books-list">
        <BooksList books={books}
          {...bindActionCreators(BookActions, dispatch)} />
      </div>
    );
  }
}
