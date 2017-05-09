import { fromJS } from 'immutable';
import {
  REMOVE_BOOK_REQUEST,
  REMOVE_BOOK_SUCCESS,
  REMOVE_BOOK_ERROR,
} from 'containers/MyBooksPage/constants';
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
      // Books converted to immutable, as other actions will be updating them
      return state
        .set('books', fromJS(action.payload.books))
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
      return state
        .setIn([
          'books',
          state.get('books').findIndex((book) => book.get('_id') === action.payload.bookId),
          'hasRequested',
        ],
        true);
    case REQUEST_BOOK_ERROR:
      return state
        .set('error', action.payload.error);
    case REMOVE_BOOK_REQUEST:
      return state
        .set('error', false);
    case REMOVE_BOOK_SUCCESS:
      return state
        .set('books', state.get('books').filter((book) => book.get('_id') !== action.payload.bookId));
    case REMOVE_BOOK_ERROR:
      return state
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default browsePageReducer;
