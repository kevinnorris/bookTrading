import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  ADD_BOOK_ERROR,
} from './constants';

export function searchRequest(payload) {
  return {
    type: SEARCH_REQUEST,
    payload,
  };
}

export function searchSuccess(payload) {
  return {
    type: SEARCH_SUCCESS,
    payload,
  };
}

export function searchError(payload) {
  return {
    type: SEARCH_ERROR,
    payload,
  };
}

export function addBook(payload) {
  return {
    type: ADD_BOOK_REQUEST,
    payload,
  };
}

export function addBookSuccess() {
  return {
    type: ADD_BOOK_SUCCESS,
  };
}

export function addBookError(payload) {
  return {
    type: ADD_BOOK_ERROR,
    payload,
  };
}
