import { fromJS } from 'immutable';

import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

// The initial state of the App
const initialState = fromJS({
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
        .set('token', action.token)
        .setIn(['userData', 'username'], action.user.username)
        .setIn(['userData', 'email'], action.user.email)
        .setIn(['userData', 'points'], action.user.points)
        .setIn(['userData', 'name'], action.user.name)
        .setIn(['userData', 'city'], action.user.city)
        .setIn(['userData', 'state'], action.user.state)
        .setIn(['userData', 'country'], action.user.country);
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
