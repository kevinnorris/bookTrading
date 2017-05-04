import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import LinkButton from 'components/LinkButton';
import PagedGrid from 'components/PagedGrid';
import { myBooksRequest, selectBook, unselectBook } from './actions';
import {
  makeSelectFetching,
  makeSelectError,
  makeSelectBooks,
  makeSelectNumPages,
  makeSelectActivePage,
  makeSelectActiveBook,
} from './selectors';

export class MyBooksPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.requestMyBooks({ activePage: 1 });
  }

  handelPageSelect = (page) => (
    this.props.requestMyBooks({ activePage: page })
  )

  selectBook = (index) => (
    () => {
      this.props.selectBook({ book: index });
    }
  )

  unselectBook = () => {
    this.props.unselectBook();
  }

  render() {
    let books = [];
    if (this.props.books) {
      books = this.props.books.map((book) => book.googleData);
    }
    return (
      <div>
        <Helmet
          title="My Books"
          meta={[
            { name: 'description', content: 'Books that have been added by user' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <LinkButton to={'/addbook'}>Add Book</LinkButton>
          <PagedGrid
            numPages={this.props.numPages ? this.props.numPages : 1}
            activePage={this.props.activePage ? this.props.activePage : 1}
            selectPage={this.handelPageSelect}
            books={books}
            selectBook={this.selectBook}
          />
        </div>
      </div>
    );
  }
}

MyBooksPage.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  books: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  numPages: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activePage: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  activeBook: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  requestMyBooks: PropTypes.func.isRequired,
  selectBook: PropTypes.func.isRequired,
  unselectBook: PropTypes.func.isRequired,
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
    requestMyBooks: (payload) => dispatch(myBooksRequest(payload)),
    selectBook: (payload) => dispatch(selectBook(payload)),
    unselectBook: () => dispatch(unselectBook()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksPage);
