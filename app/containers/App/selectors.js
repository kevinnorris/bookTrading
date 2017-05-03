import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectAuthenticating = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('authenticating')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectToken = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('token')
);

const makeSelectUserId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('userId')
);

const makeSelectUserData = () => createSelector(
  selectGlobal,
  (globalState) => ({
    username: globalState.getIn(['userData', 'username']),
    email: globalState.getIn(['userData', 'email']),
    points: globalState.getIn(['userData', 'points']),
    name: globalState.getIn(['userData', 'name']),
    city: globalState.getIn(['userData', 'city']),
    state: globalState.getIn(['userData', 'state']),
    country: globalState.getIn(['userData', 'country']),
  })
);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectAuthenticating,
  makeSelectError,
  makeSelectToken,
  makeSelectUserId,
  makeSelectUserData,
  makeSelectLocationState,
};
