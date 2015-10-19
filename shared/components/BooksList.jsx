import React from 'react';

export default class BooksView extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.fetchBooks(this.refs.q.value);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" ref="q" />
          <input type="submit" value="Fetch" />
        </form>
        <hr />
        {
          this.props.books.map( (book) => {
            return (
              <p key={book.id}>{book.volumeInfo.title}</p>
            );
          })
        }
      </div>
    )
  }
}
