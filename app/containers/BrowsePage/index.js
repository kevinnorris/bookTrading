/* eslint no-underscore-dangle: 0*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import Title from 'components/Title';
import PagedGrid from 'components/PagedGrid';
import BookModal from 'components/BookModal';
import Error from 'components/Error';
import ActionButton from 'components/ActionButton';
import DeleteButton from 'components/DeleteButton';
import { makeSelectUserId, makeSelectActiveBook } from 'containers/App/selectors';
import { selectBook, unselectBook } from 'containers/App/actions';
import { removeBook } from 'containers/MyBooksPage/actions';
import { allBooksRequest, requestBook } from './actions';
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
} from './selectors';

export class BrowsePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.requestAllBooks({ activePage: 1 });
  }

  handelPageSelect = (page) => (
    this.props.requestAllBooks({ activePage: page })
  )

  selectBook = (index) => (
    () => {
      this.props.selectBook({ book: index });
    }
  )

  unselectBook = () => {
    this.props.unselectBook();
  }

  removeBook = (bookId) => (
    () => {
      this.props.removeBook({ bookId });
    }
  )

  requestBook = (bookId, bookOwner, title) => (
    () => {
      this.props.requestBook({ bookId, bookOwner, title });
    }
  )

  removeRequest = (requestId) => (
    () => {
      // TODO: Import remove request from RequestPage actions
      // May need to be based on bookId
    }
  )

  render() {
    let books = [];
    let currentBook = false;
    if (this.props.books) {
      // Books were converted to immutable in reducer, must be converted back for use by react
      books = this.props.books.toJS();
    }
    if (Number.isInteger(this.props.activeBook) && this.props.books) {
      currentBook = books[this.props.activeBook];
    }
    // TODO: Test request book button and saga

    // Book modal variables
    let btnText = false;
    let btnType = false;
    let btnAction = false;
    if (currentBook.isOwner) {
      btnText = 'Delete Book';
      btnType = DeleteButton;
      btnAction = this.removeBook(currentBook._id);
    } else if (currentBook.hasRequested) {
      btnText = 'Remove Request';
      btnType = DeleteButton;
      btnAction = this.removeRequest;
    } else if (currentBook) {
      btnText = 'Request Book';
      btnType = ActionButton;
      btnAction = this.requestBook(currentBook._id, currentBook.owner, currentBook.googleData.title);
    }
    return (
      <div>
        <Helmet
          title="Browse Books"
          meta={[
            { name: 'description', content: 'Browse available books' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>Browse Available Books</Title>
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
          hasButton={!!this.props.userId}
          buttonText={btnText}
          buttonAction={btnAction}
          ButtonType={btnType}
          loading={this.props.fetching}
        />
      </div>
    );
  }
}

BrowsePage.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  books: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  numPages: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activePage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activeBook: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  requestAllBooks: PropTypes.func.isRequired,
  requestBook: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired,
  unselectBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  books: makeSelectBooks(),
  numPages: makeSelectNumPages(),
  activePage: makeSelectActivePage(),
  activeBook: makeSelectActiveBook(),
  userId: makeSelectUserId(),
});

function mapDispatchToProps(dispatch) {
  return {
    requestAllBooks: (payload) => dispatch(allBooksRequest(payload)),
    requestBook: (payload) => dispatch(requestBook(payload)),
    selectBook: (payload) => dispatch(selectBook(payload)),
    unselectBook: () => dispatch(unselectBook()),
    removeBook: (payload) => dispatch(removeBook(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
