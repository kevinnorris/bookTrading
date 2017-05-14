import { fromJS } from 'immutable';

import { loggedIn, updateUser } from './auth';

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

// The initial state of the App
let initialState = fromJS({
  authenticating: false,
  fetching: false,
  error: false,
  token: false,
  userId: false,
  userData: {
    email: false,
    name: false,
    city: false,
    country: false,
    zip: false,
    bookCount: false,
    wishlistCount: false,
    pendingCount: false,
    inProgressCount: false,
  },
  activeBook: false,
});
// If a cookie is available update initial state with its data
const cookie = loggedIn();
if (cookie) {
  initialState = initialState
    .set('token', cookie.token)
    .set('expireDate', new Date(cookie.expireDate))
    .set('userId', cookie.userId)
    .setIn(['userData', 'email'], cookie.user.email)
    .setIn(['userData', 'name'], cookie.user.name)
    .setIn(['userData', 'city'], cookie.user.city)
    .setIn(['userData', 'country'], cookie.user.country)
    .setIn(['userData', 'zip'], cookie.user.zip);
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
    case UPDATE_SETTINGS_REQUEST:
      return state
        .set('error', false)
        .set('fetching', true);
    case UPDATE_SETTINGS_SUCCESS: {
      // update the cookie with new user info
      updateUser(action.payload.name, action.payload.city, action.payload.country, action.payload.zip);

      let updatedState = state
        .set('fetching', false);
      if (action.payload.name) {
        updatedState = updatedState.setIn(['userData', 'name'], action.payload.name);
      }
      if (action.payload.city) {
        updatedState = updatedState.setIn(['userData', 'city'], action.payload.city);
      }
      if (action.payload.country) {
        updatedState = updatedState.setIn(['userData', 'country'], action.payload.country);
      }
      if (action.payload.zip) {
        updatedState = updatedState.setIn(['userData', 'zip'], action.payload.zip);
      }
      return updatedState;
    }
    case UPDATE_SETTINGS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('fetching', false);
    case USER_STATS_REQUEST:
      return state
        .set('error', false)
        .setIn(['userData', 'bookCount'], false)
        .setIn(['userData', 'wishlistCount'], false)
        .setIn(['userData', 'pendingCount'], false)
        .setIn(['userData', 'inProgressCount'], false)
        .set('fetching', true);
    case USER_STATS_SUCCESS:
      return state
        .setIn(['userData', 'bookCount'], action.payload.bookCount)
        .setIn(['userData', 'wishlistCount'], action.payload.wishlistCount)
        .setIn(['userData', 'pendingCount'], action.payload.pendingCount)
        .setIn(['userData', 'inProgressCount'], action.payload.inProgressCount)
        .set('fetching', false);
    case USER_STATS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('fetching', false);
    default:
      return state;
  }
}

export default appReducer;
