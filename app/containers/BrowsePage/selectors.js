import { createSelector } from 'reselect';

/**
 * Direct selector to the browsePage state domain
 */
const selectBrowsePageDomain = () => (state) => state.get('browsPage');

/**
 * Other specific selectors
 */
const makeSelectFetching = () => createSelector(
  selectBrowsePageDomain(),
  (AllBooksState) => AllBooksState.get('fetching')
);

const makeSelectError = () => createSelector(
  selectBrowsePageDomain(),
  (AllBooksState) => AllBooksState.get('error')
);

const makeSelectBooks = () => createSelector(
  selectBrowsePageDomain(),
  (AllBooksState) => AllBooksState.get('books')
);

const makeSelectNumPages = () => createSelector(
  selectBrowsePageDomain(),
  (AllBooksState) => AllBooksState.get('numPages')
);

const makeSelectActivePage = () => createSelector(
  selectBrowsePageDomain(),
  (AllBooksState) => AllBooksState.get('activePage')
);


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
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
};
