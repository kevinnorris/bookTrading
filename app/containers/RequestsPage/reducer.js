import { fromJS } from 'immutable';
import {
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_ERROR,
  ACCEPT_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_ERROR,
  CANCEL_REQUEST_REQUEST,
  CANCEL_REQUEST_SUCCESS,
  CANCEL_REQUEST_ERROR,
  COMPLETE_REQUEST_REQUEST,
  COMPLETE_REQUEST_SUCCESS,
  COMPLETE_REQUEST_ERROR,
} from './constants';

const initialState = fromJS({
  fetching: false,
  error: false,
  requests: false,
});

function requestsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return state
        .set('error', false)
        .set('requests', false)
        .set('fetching', true);
    case GET_REQUESTS_SUCCESS:
      return state
        .set('requests', fromJS(action.payload.requests))
        .set('fetching', false);
    case GET_REQUESTS_ERROR:
      return state
        .set('error', action.payload.error)
        .set('fetching', false);
    case ACCEPT_REQUEST_REQUEST:
      return state
        .set('error', false);
    case ACCEPT_REQUEST_SUCCESS:
      return state
        .setIn([
          'requests',
          state.get('requests').findIndex((request) => request.get('_id') === action.payload.requestId),
          'accepted',
        ],
        true);
    case ACCEPT_REQUEST_ERROR:
      return state
        .set('error', action.payload.error);
    case CANCEL_REQUEST_REQUEST:
      return state
        .set('error', false);
    case CANCEL_REQUEST_SUCCESS:
      return state
        .setIn([
          'requests',
          state.get('requests').findIndex((request) => request.get('_id') === action.payload.requestId),
          'accepted',
        ],
        false);
    case CANCEL_REQUEST_ERROR:
      return state
        .set('error', action.payload.error);
    case COMPLETE_REQUEST_REQUEST:
      return state
        .set('error', false);
    case COMPLETE_REQUEST_SUCCESS:
      return state
        .set('requests', state.get('requests').filter((book) => book.get('_id') !== action.payload.requestId));
    case COMPLETE_REQUEST_ERROR:
      return state
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default requestsPageReducer;
