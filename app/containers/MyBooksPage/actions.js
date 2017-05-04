import {
  MY_BOOKS_REQUEST,
  MY_BOOKS_SUCCESS,
  MY_BOOKS_ERROR,
  SELECT_BOOK,
  UNSELECT_BOOK,
} from './constants';

export function myBooksRequest(payload) {
  return {
    type: MY_BOOKS_REQUEST,
    payload,
  };
}

export function myBooksSuccess(payload) {
  return {
    type: MY_BOOKS_SUCCESS,
    payload,
  };
}

export function myBooksError(payload) {
  return {
    type: MY_BOOKS_ERROR,
    payload,
  };
}

export function selectBook(payload) {
  return {
    type: SELECT_BOOK,
    payload,
  };
}

export function unselectBook() {
  return {
    type: UNSELECT_BOOK,
  };
}
