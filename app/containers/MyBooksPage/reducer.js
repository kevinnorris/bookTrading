import { fromJS } from 'immutable';
import {
  MY_BOOKS_REQUEST,
  MY_BOOKS_SUCCESS,
  MY_BOOKS_ERROR,
  SELECT_BOOK,
  UNSELECT_BOOK,
  REMOVE_BOOK_REQUEST,
  REMOVE_BOOK_SUCCESS,
  REMOVE_BOOK_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: false,
  books: false,
  numPages: false,
  activePage: false,
  activeBook: false,
});

function myBooksPageReducer(state = initialState, action) {
  switch (action.type) {
    case MY_BOOKS_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('numPages', false)
        .set('activePage', action.payload.activePage)
        .set('activeBook', false)
        .set('fetching', true);
    case MY_BOOKS_SUCCESS:
      return state
        .set('books', action.payload.books)
        .set('numPages', action.payload.numPages)
        .set('fetching', false);
    case MY_BOOKS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('activePage', false)
        .set('fetching', false);
    case SELECT_BOOK:
      return state
        .set('activeBook', action.payload.book);
    case UNSELECT_BOOK:
      return state
        .set('activeBook', false);
    case REMOVE_BOOK_REQUEST:
      return state
        .set('error', false);
    case REMOVE_BOOK_SUCCESS:
      return state
        .set('activeBook', false)
        .set('books', state.get('books').filter((book) => book._id !== action.payload.bookId));
    case REMOVE_BOOK_ERROR:
      return state
        .set('activeBook', false)   // Remove once selected book is refactored out
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default myBooksPageReducer;
