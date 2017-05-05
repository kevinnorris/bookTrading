import {
  MY_BOOKS_REQUEST,
  MY_BOOKS_SUCCESS,
  MY_BOOKS_ERROR,
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
