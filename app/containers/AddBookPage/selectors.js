import { createSelector } from 'reselect';

/**
 * Direct selector to the addBookPage state domain
 */
const selectAddBookPageDomain = (state) => state.get('addBookPage');

/**
 * Other specific selectors
 */
const makeSelectSearching = () => createSelector(
  selectAddBookPageDomain,
  (AddBookState) => AddBookState.get('searching')
);

const makeSelectError = () => createSelector(
  selectAddBookPageDomain,
  (AddBookState) => AddBookState.get('error')
);

const makeSelectBooks = () => createSelector(
  selectAddBookPageDomain,
  (AddBookState) => AddBookState.get('books')
);

const makeSelectActiveBook = () => createSelector(
  selectAddBookPageDomain,
  (AddBookState) => AddBookState.get('activeBook')
);

export {
  selectAddBookPageDomain,
  makeSelectSearching,
  makeSelectError,
  makeSelectBooks,
  makeSelectActiveBook,
};
