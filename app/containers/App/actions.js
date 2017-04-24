import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

export function authenticateUser() {
  return {
    type: AUTHENTICATE_USER,
  };
}

export function userLoggedIn(user, token) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    user,
    token,
  };
}

export function userLogginError(error) {
  return {
    type: AUTHENTICATE_USER_ERROR,
    error,
  };
}

export function logtoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
