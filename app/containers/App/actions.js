import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
  SELECT_BOOK,
  UNSELECT_BOOK,
  UPDATE_SETTINGS_REQUEST,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_ERROR,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
  USER_STATS_ERROR,
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

export function updateSettingsRequest(payload) {
  return {
    type: UPDATE_SETTINGS_REQUEST,
    payload,
  };
}

export function updateSettingsSuccess(payload) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    payload,
  };
}

export function updateSettingsError(payload) {
  return {
    type: UPDATE_SETTINGS_ERROR,
    payload,
  };
}

export function userStatsRequest() {
  return {
    type: USER_STATS_REQUEST,
  };
}

export function userStatsSuccess(payload) {
  return {
    type: USER_STATS_SUCCESS,
    payload,
  };
}

export function userStatsError(payload) {
  return {
    type: USER_STATS_ERROR,
    payload,
  };
}
