import { push } from 'react-router-redux';
import { take, call, put, race, takeLatest } from 'redux-saga/effects';
import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';
import * as auth from './auth';

/**
 * Login Saga
 * @param {object} action {type, payload: {username, password}}
 */
export function* login(action) {
  // A LOGOUT_USER may happen during as the user is being authenticated, leading to a race condition
  // race returns the winner, the one that finishes first
  const winner = yield race({
    auth: call(auth.login, action.payload.username, action.payload.password),
    logout: take(LOGOUT_USER),
  });

  if (winner.auth) {
    yield put({ type: AUTHENTICATE_USER_SUCCESS, payload: winner.auth });
    // Go to dashboard
    yield put(push('/dashboard'));
  }
}

/**
 * Signup Saga
 * @param {object} action {type, payload} all provided user info is given in payload
 */
export function* signup(action) {
  const winner = yield race({
    auth: call(auth.signup, action.payload),
    logout: take(LOGOUT_USER),
  });

  if (winner.auth) {
    yield put({ type: AUTHENTICATE_USER_SUCCESS, payload: winner.auth });
    // Go to dashboard
    yield put(push('/dashboard'));
  }
}

export function* logout() {
  call(auth.logout);
  // Go to landing page
  yield put(push('/'));
}

/**
 * Calls login or signup based on action.login bool
 * @param {object} action
 */
export function* authenticateRequest(action) {
  try {
    if (action.login) {
      yield call(login, action);
    } else {
      yield call(signup, action);
    }
  } catch (error) {
    yield put({ type: AUTHENTICATE_USER_ERROR, error: error.response });
  }
}

export function* authWatcher() {
  // Watches for auth actions and calls the appropriate function when one comes in.
  const watcher = yield [
    takeLatest(AUTHENTICATE_USER, authenticateRequest),
    takeLatest(LOGOUT_USER, logout),
  ];
}

// All sagas to be loaded
export default [
  authWatcher,
];
