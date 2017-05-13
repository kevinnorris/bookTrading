import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import Header from 'containers/Header';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import PagedGrid from 'components/PagedGrid';
import BookModal from 'components/BookModal';
import DeleteButton from 'components/DeleteButton';
import Error from 'components/Error';
import { makeSelectActiveBook } from 'containers/App/selectors';
import { selectBook, unselectBook } from 'containers/App/actions';
import { wishlistBooksRequest, removeRequestRequest } from './actions';
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
} from './selectors';

export class WishlistPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.requestWishlist({ activePage: 1 });
  }

  handelPageSelect = (page) => (
    this.props.requestWishlist({ activePage: page })
  )

  selectBook = (index) => (
    () => {
      this.props.selectBook({ book: index });
    }
  )

  unselectBook = () => {
    this.props.unselectBook();
  }

  removeRequest = (bookId) => (
    () => {
      this.props.removeRequest({ bookId });
    }
  )

  render() {
    let books = [];
    let currentBook = false;
    if (this.props.books) {
      books = this.props.books.map((book) => book.googleData);
    }
    if (Number.isInteger(this.props.activeBook) && this.props.books) {
      currentBook = this.props.books[this.props.activeBook];
    }
    return (
      <div>
        <Helmet
          title="Wishlist"
          meta={[
            { name: 'description', content: 'Books you have requested' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>Wishlist</Title>
          <SubTitle>Containes all books that you have requested where the requests are still pending</SubTitle>
          {this.props.error ? <Error>{this.props.error}</Error> : null}
          <PagedGrid
            numPages={this.props.numPages ? this.props.numPages : 1}
            activePage={this.props.activePage ? this.props.activePage : 1}
            selectPage={this.handelPageSelect}
            books={books}
            selectBook={this.selectBook}
            loading={this.props.fetching}
          />
        </div>
        <BookModal
          show={Number.isInteger(this.props.activeBook)}
          onHide={this.unselectBook}
          currentBook={currentBook ? currentBook.googleData : false}
          buttonText={'Remove Request'}
          buttonAction={this.removeRequest(currentBook._id)}
          ButtonType={DeleteButton}
          loading={this.props.fetching}
          hasButton
        />
      </div>
    );
  }
}

WishlistPage.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  books: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  numPages: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activePage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activeBook: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  requestWishlist: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired,
  unselectBook: PropTypes.func.isRequired,
  removeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  books: makeSelectBooks(),
  numPages: makeSelectNumPages(),
  activePage: makeSelectActivePage(),
  activeBook: makeSelectActiveBook(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestWishlist: (payload) => dispatch(wishlistBooksRequest(payload)),
    selectBook: (payload) => dispatch(selectBook(payload)),
    unselectBook: () => dispatch(unselectBook()),
    removeRequest: (payload) => dispatch(removeRequestRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
