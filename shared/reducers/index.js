import { combineReducers } from 'redux';
import todos from './TodoReducer';
import books from './BookReducer';

export default combineReducers({
  todos,
  books
});
