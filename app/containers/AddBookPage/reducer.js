import { fromJS } from 'immutable';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SELECT_BOOK,
  UNSELECT_BOOK,
  ADD_BOOK_SUCCESS,
} from './constants';

const initialState = fromJS({
  searching: false,
  error: false,
  books: false,
  activeBook: false,
});

function addBookPageReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('activeBook', false)
        .set('searching', true);
    case SEARCH_SUCCESS:
      return state
        .set('searching', false)
        .set('books', action.payload.books);
    case SEARCH_ERROR:
      return state
        .set('searching', false)
        .set('error', action.payload.error);
    case SELECT_BOOK:
      return state
        .set('activeBook', action.payload.book);
    case UNSELECT_BOOK:
      return state
        .set('activeBook', false);
    case ADD_BOOK_SUCCESS:
      return state
        .set('error', false)
        .set('books', false)
        .set('activeBook', false)
        .set('searching', false);
    default:
      return state;
  }
}

export default addBookPageReducer;
