export default function bookReducer(state = [], action) {
  switch(action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
