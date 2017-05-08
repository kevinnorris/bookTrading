import { fromJS } from 'immutable';
import {
  ALL_BOOKS_REQUEST,
  ALL_BOOKS_SUCCESS,
  ALL_BOOKS_ERROR,
  REQUEST_BOOK,
  REQUEST_BOOK_SUCCESS,
  REQUEST_BOOK_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: false,
  books: false,
  numPages: false,
  activePage: false,
});

function browsePageReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_BOOKS_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('numPages', false)
        .set('activePage', action.payload.activePage)
        .set('fetching', true);
    case ALL_BOOKS_SUCCESS:
      return state
        .set('books', action.payload.books)
        .set('numPages', action.payload.numPages)
        .set('fetching', false);
    case ALL_BOOKS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('activePage', false)
        .set('fetching', false);
    case REQUEST_BOOK:
      return state
        .set('error', false);
    case REQUEST_BOOK_SUCCESS:
      // TODO: test
      // Should update the hasRequested value of the requested book
      return state
        .setIn(['books'], state.get('books').findIndex(action.payload.bookId), 'hasRequested', true);
    case REQUEST_BOOK_ERROR:
      return state
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default browsePageReducer;
