import { createSelector } from 'reselect';

/**
 * Direct selector to the wishlistPage state domain
 */
const selectWishlistPageDomain = () => (state) => state.get('wishlistPage');

/**
 * Other specific selectors
 */
const makeSelectFetching = () => createSelector(
  selectWishlistPageDomain(),
  (wishlistState) => wishlistState.get('fetching')
);

const makeSelectError = () => createSelector(
  selectWishlistPageDomain(),
  (wishlistState) => wishlistState.get('error')
);

const makeSelectBooks = () => createSelector(
  selectWishlistPageDomain(),
  (wishlistState) => wishlistState.get('books')
);

const makeSelectNumPages = () => createSelector(
  selectWishlistPageDomain(),
  (wishlistState) => wishlistState.get('numPages')
);

const makeSelectActivePage = () => createSelector(
  selectWishlistPageDomain(),
  (wishlistState) => wishlistState.get('activePage')
);

/**
 * Default selector used by WishlistPage
 */

const makeSelectWishlistPage = () => createSelector(
  selectWishlistPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectWishlistPage;
export {
  selectWishlistPageDomain,
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
};
