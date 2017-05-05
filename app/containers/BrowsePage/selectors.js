import { createSelector } from 'reselect';

/**
 * Direct selector to the browsePage state domain
 */
const selectBrowsePageDomain = () => (state) => state.get('browsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by BrowsePage
 */

const makeSelectBrowsePage = () => createSelector(
  selectBrowsePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectBrowsePage;
export {
  selectBrowsePageDomain,
};
