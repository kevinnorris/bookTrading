import { createSelector } from 'reselect';

/**
 * Direct selector to the addBookPage state domain
 */
const selectAddBookPageDomain = () => (state) => state.get('addBookPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AddBookPage
 */

const makeSelectAddBookPage = () => createSelector(
  selectAddBookPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectAddBookPage;
export {
  selectAddBookPageDomain,
};
