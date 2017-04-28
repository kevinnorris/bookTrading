import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH_TERM,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SELECT_BOOK,
  UNSELECT_BOOK,
} from './constants';

const initialState = fromJS({
  searchTerm: false,
  searching: false,
  error: false,
  books: false,
  selectedBook: false,
});

function addBookPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return state
        .set('searchTerm', action.payload.searchTerm);
    case SEARCH_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('selectedBook', false)
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
        .set('selectedBook', action.payload.book);
    case UNSELECT_BOOK:
      return state
        .set('selectedBook', false);
    default:
      return state;
  }
}

export default addBookPageReducer;
