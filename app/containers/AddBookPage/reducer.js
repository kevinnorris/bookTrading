import { fromJS } from 'immutable';
import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  ADD_BOOK_SUCCESS,
} from './constants';

const initialState = fromJS({
  searching: false,
  error: false,
  books: false,
});

function addBookPageReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('searching', true);
    case SEARCH_SUCCESS:
      return state
        .set('searching', false)
        .set('books', action.payload.books);
    case SEARCH_ERROR:
      return state
        .set('searching', false)
        .set('error', action.payload.error);
    case ADD_BOOK_SUCCESS:
      return state
        .set('error', false)
        .set('books', false)
        .set('searching', false);
    default:
      return state;
  }
}

export default addBookPageReducer;
