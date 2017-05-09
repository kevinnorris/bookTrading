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
    email: globalState.getIn(['userData', 'email']),
    name: globalState.getIn(['userData', 'name']),
    city: globalState.getIn(['userData', 'city']),
    country: globalState.getIn(['userData', 'country']),
    zip: globalState.getIn(['userData', 'zip']),
  })
);

const makeSelectActiveBook = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('activeBook')
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
  makeSelectActiveBook,
  makeSelectLocationState,
};
