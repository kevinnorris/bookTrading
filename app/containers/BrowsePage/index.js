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

  removeRequest = (requestId) => (
    () => {
      // TODO: Import remove request from RequestPage actions
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
      console.log(currentBook);
    }
    // TODO: Test request book button and saga

    // Book modal variables
    let btnText = 'Request Book';
    let btnType = ActionButton;
    let btnAction = this.props.requestBook;
    if (currentBook.isOwner) {
      btnText = 'Delete Book';
      btnType = DeleteButton;
      btnAction = this.removeBook;
    } else if (currentBook.hasRequested) {
      btnText = 'Remove Request';
      btnType = DeleteButton;
      btnAction = this.removeRequest;
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
        {/*Request, RemoveRequest, Delete button, based on isOwner and hasRequested*/}
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
  books: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
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
    removeBook : (payload) => dispatch(removeBook(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
