import { createSelector } from 'reselect';

/**
 * Direct selector to the myBooksPage state domain
 */
const selectMyBooksPageDomain = () => (state) => state.get('myBooksPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MyBooksPage
 */

const makeSelectMyBooksPage = () => createSelector(
  selectMyBooksPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMyBooksPage;
export {
  selectMyBooksPageDomain,
};
