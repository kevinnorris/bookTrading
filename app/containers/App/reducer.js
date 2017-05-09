import { fromJS } from 'immutable';

import { loggedIn } from './auth';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
  SELECT_BOOK,
  UNSELECT_BOOK,
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
    userId: cookie.userId,
    userData: {
      email: cookie.user.email,
      name: cookie.user.name,
      city: cookie.user.city,
      country: cookie.user.country,
      zip: cookie.user.zip,
    },
    activeBook: false,
  });
} else {
  initialState = fromJS({
    authenticating: false,
    error: false,
    token: false,
    userId: false,
    userData: {
      email: false,
      name: false,
      city: false,
      country: false,
      zip: false,
    },
    activeBook: false,
  });
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return state
        .set('authenticating', true)
        .set('error', false)
        .setIn(['userData', 'email'], false)
        .setIn(['userData', 'name'], false)
        .setIn(['userData', 'city'], false)
        .setIn(['userData', 'country'], false)
        .setIn(['userData', 'zip'], false);
    case AUTHENTICATE_USER_SUCCESS:
      return state
        .set('authenticating', false)
        .set('token', action.payload.token)
        .set('userId', action.payload.userId)
        .setIn(['userData', 'email'], action.payload.user.email)
        .setIn(['userData', 'name'], action.payload.user.name)
        .setIn(['userData', 'city'], action.payload.user.city)
        .setIn(['userData', 'country'], action.payload.user.country)
        .setIn(['userData', 'zip'], action.payload.user.zip);
    case AUTHENTICATE_USER_ERROR:
      return state
        .set('authenticating', false)
        .set('error', action.error);
    case LOGOUT_USER:
      return state
        .set('token', false)
        .setIn(['userData', 'email'], false)
        .setIn(['userData', 'name'], false)
        .setIn(['userData', 'city'], false)
        .setIn(['userData', 'country'], false)
        .setIn(['userData', 'zip'], false);
    case SELECT_BOOK:
      return state
        .set('activeBook', action.payload.book);
    case UNSELECT_BOOK:
      return state
        .set('activeBook', false);
    default:
      return state;
  }
}

export default appReducer;
