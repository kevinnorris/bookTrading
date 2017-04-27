import { fromJS } from 'immutable';

import { loggedIn } from './auth';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

// The initial state of the App, If a cookie is available initialize state with its data
const cookie = loggedIn();
let initialState;
if (cookie) {
  initialState = fromJS({
    authenticating: false,
    error: false,
    token: cookie.token,
    expireDate: new Date(cookie.expireDate),
    userData: {
      username: cookie.user.username,
      email: cookie.user.email,
      points: cookie.user.points,
      name: cookie.user.name,
      city: cookie.user.city,
      state: cookie.user.state,
      country: cookie.user.country,
    },
  });
} else {
  initialState = fromJS({
    authenticating: false,
    error: false,
    token: false,
    userData: {
      username: false,
      email: false,
      points: false,
      name: false,
      city: false,
      state: false,
      country: false,
    },
  });
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return state
        .set('authenticating', true)
        .set('error', false)
        .setIn(['userData', 'username'], false)
        .setIn(['userData', 'email'], false)
        .setIn(['userData', 'points'], false)
        .setIn(['userData', 'name'], false)
        .setIn(['userData', 'city'], false)
        .setIn(['userData', 'state'], false)
        .setIn(['userData', 'country'], false);
    case AUTHENTICATE_USER_SUCCESS:
      return state
        .set('authenticating', false)
        .set('token', action.payload.token)
        .setIn(['userData', 'username'], action.payload.user.username)
        .setIn(['userData', 'email'], action.payload.user.email)
        .setIn(['userData', 'points'], action.payload.user.points)
        .setIn(['userData', 'name'], action.payload.user.name)
        .setIn(['userData', 'city'], action.payload.user.city)
        .setIn(['userData', 'state'], action.payload.user.state)
        .setIn(['userData', 'country'], action.payload.user.country);
    case AUTHENTICATE_USER_ERROR:
      return state
        .set('authenticating', false)
        .set('error', action.error);
    case LOGOUT_USER:
      return state
        .set('token', false)
        .setIn(['userData', 'username'], false)
        .setIn(['userData', 'email'], false)
        .setIn(['userData', 'points'], false)
        .setIn(['userData', 'name'], false)
        .setIn(['userData', 'city'], false)
        .setIn(['userData', 'state'], false)
        .setIn(['userData', 'country'], false);
    default:
      return state;
  }
}

export default appReducer;
