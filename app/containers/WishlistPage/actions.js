import {
  WISHLIST_BOOKS_REQUEST,
  WISHLIST_BOOKS_SUCCESS,
  WISHLIST_BOOKS_ERROR,
  REMOVE_REQUEST_REQUEST,
  REMOVE_REQUEST_SUCCESS,
  REMOVE_REQUEST_ERROR,
} from './constants';

export function wishlistBooksRequest(payload) {
  return {
    type: WISHLIST_BOOKS_REQUEST,
    payload,
  };
}

export function wishlistBooksSuccess(payload) {
  return {
    type: WISHLIST_BOOKS_SUCCESS,
    payload,
  };
}

export function wishlistBooksError(payload) {
  return {
    type: WISHLIST_BOOKS_ERROR,
    payload,
  };
}

export function removeRequestRequest(payload) {
  return {
    type: REMOVE_REQUEST_REQUEST,
    payload,
  };
}

export function removeRequestSuccess(payload) {
  return {
    type: REMOVE_REQUEST_SUCCESS,
    payload,
  };
}

export function removeRequestError(payload) {
  return {
    type: REMOVE_REQUEST_ERROR,
    payload,
  };
}
