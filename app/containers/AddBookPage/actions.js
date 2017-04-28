import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SELECT_BOOK,
  UNSELECT_BOOK,
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
