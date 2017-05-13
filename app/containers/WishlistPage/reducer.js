import { fromJS } from 'immutable';
import {
  WISHLIST_BOOKS_REQUEST,
  WISHLIST_BOOKS_SUCCESS,
  WISHLIST_BOOKS_ERROR,
  REMOVE_REQUEST_REQUEST,
  REMOVE_REQUEST_SUCCESS,
  REMOVE_REQUEST_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: false,
  books: false,
  numPages: false,
  activePage: false,
});

function wishlistPageReducer(state = initialState, action) {
  switch (action.type) {
    case WISHLIST_BOOKS_REQUEST:
      return state
        .set('error', false)
        .set('books', false)
        .set('numPages', false)
        .set('activePage', action.payload.activePage)
        .set('fetching', true);
    case WISHLIST_BOOKS_SUCCESS:
      return state
        .set('books', action.payload.books)
        .set('numPages', action.payload.numPages)
        .set('fetching', false);
    case WISHLIST_BOOKS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('activePage', false)
        .set('fetching', false);
    case REMOVE_REQUEST_REQUEST:
      return state
        .set('error', false);
    case REMOVE_REQUEST_SUCCESS:
      return state
        .set('books', state.get('books').filter((book) => book._id !== action.payload.bookId));
    case REMOVE_REQUEST_ERROR:
      return state
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default wishlistPageReducer;
