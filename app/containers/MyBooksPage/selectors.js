import { createSelector } from 'reselect';

/**
 * Direct selector to the myBooksPage state domain
 */
const selectMyBooksPageDomain = () => (state) => state.get('myBooksPage');

/**
 * Other specific selectors
 */
const makeSelectFetching = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('fetching')
);

const makeSelectError = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('error')
);

const makeSelectBooks = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('books')
);

const makeSelectNumPages = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('numPages')
);

const makeSelectActivePage = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('activePage')
);

const makeSelectActiveBook = () => createSelector(
  selectMyBooksPageDomain(),
  (MyBooksState) => MyBooksState.get('activeBook')
);
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
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
  makeSelectActiveBook,
};
