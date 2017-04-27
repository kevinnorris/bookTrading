import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

export function loginRequest(payload) {
  return {
    type: AUTHENTICATE_USER,
    payload,
    login: true,
  };
}

export function signupRequest(payload) {
  console.log('signupRequest action called');
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
