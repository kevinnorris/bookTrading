import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
  SELECT_BOOK,
  UNSELECT_BOOK,
} from './constants';

export function loginRequest(payload) {
  return {
    type: AUTHENTICATE_USER,
    payload,
    login: true,
  };
}

export function signupRequest(payload) {
  return {
    type: AUTHENTICATE_USER,
    payload,
    login: false,
  };
}

export function authUserSuccess(payload) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload,
  };
}

export function authUserError(error) {
  return {
    type: AUTHENTICATE_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
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
