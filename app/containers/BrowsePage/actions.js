import {
  ALL_BOOKS_REQUEST,
  ALL_BOOKS_SUCCESS,
  ALL_BOOKS_ERROR,
  REQUEST_BOOK,
  REQUEST_BOOK_SUCCESS,
  REQUEST_BOOK_ERROR,
} from './constants';

export function allBooksRequest(payload) {
  return {
    type: ALL_BOOKS_REQUEST,
    payload,
  };
}

export function allBooksSuccess(payload) {
  return {
    type: ALL_BOOKS_SUCCESS,
    payload,
  };
}

export function allBooksError(payload) {
  return {
    type: ALL_BOOKS_ERROR,
    payload,
  };
}

export function requestBook(payload) {
  return {
    type: REQUEST_BOOK,
    payload,
  };
}

export function requestBookSuccess(payload) {
  return {
    type: REQUEST_BOOK_SUCCESS,
    payload,
  };
}

export function requestBookError(payload) {
  return {
    type: REQUEST_BOOK_ERROR,
    payload,
  };
}
