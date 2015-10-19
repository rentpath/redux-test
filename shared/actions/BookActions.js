import request from "superagent";

export function fetchBooks(query = 'foo') {
  return (dispatch, getState) => {
    request
      .get('https://www.googleapis.com/books/v1/volumes', { q: query })
      .end(function (err, res) {
        if (err) {
          dispatch({
            type: 'FETCH_BOOKS_FAILURE',
            payload: new Error("Bad response from server"),
            error: true
          });
        } else {
          dispatch({
            type: 'FETCH_BOOKS_SUCCESS',
            payload: res.body.items
          });
        }
      });
  }
}
