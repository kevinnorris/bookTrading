import { createSelector } from 'reselect';

/**
 * Direct selector to the requestsPage state domain
 */
const selectRequestsPageDomain = () => (state) => state.get('requestsPage');

/**
 * Other specific selectors
 */
const makeSelectFetching = () => createSelector(
  selectRequestsPageDomain(),
  (requestsState) => requestsState.get('fetching')
);

const makeSelectError = () => createSelector(
  selectRequestsPageDomain(),
  (requestsState) => requestsState.get('error')
);

const makeSelectRequests = () => createSelector(
  selectRequestsPageDomain(),
  (requestsState) => requestsState.get('requests')
);

/**
 * Default selector used by RequestsPage
 */

const makeSelectRequestsPage = () => createSelector(
  selectRequestsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRequestsPage;
export {
  selectRequestsPageDomain,
  makeSelectFetching,
  makeSelectError,
  makeSelectRequests,
};
