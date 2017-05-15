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

export function getRequests() {
  return {
    type: GET_REQUESTS_REQUEST,
  };
}
export function getRequestsSuccess(payload) {
  return {
    type: GET_REQUESTS_SUCCESS,
    payload,
  };
}
export function getRequestsError(payload) {
  return {
    type: GET_REQUESTS_ERROR,
    payload,
  };
}

export function acceptRequest(payload) {
  return {
    type: ACCEPT_REQUEST_REQUEST,
    payload,
  };
}
export function acceptRequestSuccess(payload) {
  return {
    type: ACCEPT_REQUEST_SUCCESS,
    payload,
  };
}
export function acceptRequestError(payload) {
  return {
    type: ACCEPT_REQUEST_ERROR,
    payload,
  };
}

export function cancelRequest(payload) {
  return {
    type: CANCEL_REQUEST_REQUEST,
    payload,
  };
}
export function cancelRequestSuccess(payload) {
  return {
    type: CANCEL_REQUEST_SUCCESS,
    payload,
  };
}
export function cancelRequestError(payload) {
  return {
    type: CANCEL_REQUEST_ERROR,
    payload,
  };
}

export function completeRequest(payload) {
  return {
    type: COMPLETE_REQUEST_REQUEST,
    payload,
  };
}
export function completeRequestSuccess(payload) {
  return {
    type: COMPLETE_REQUEST_SUCCESS,
    payload,
  };
}
export function completeRequestError(payload) {
  return {
    type: COMPLETE_REQUEST_ERROR,
    payload,
  };
}
