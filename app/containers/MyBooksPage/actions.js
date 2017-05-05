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

export function removeBook(payload) {
  return {
    type: REMOVE_BOOK_REQUEST,
    payload,
  };
}

export function removeBookSuccess(payload) {
  return {
    type: REMOVE_BOOK_SUCCESS,
    payload,
  };
}

export function removeBookError(payload) {
  return {
    type: REMOVE_BOOK_ERROR,
    payload,
  };
}
