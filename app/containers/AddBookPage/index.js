import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';

import Header from 'containers/Header';
import Title from 'components/Title';
import BookGrid from 'components/BookGrid';
import BookModal from 'components/BookModal';
import {
  makeSelectSearching,
  makeSelectError,
  makeSelectBooks,
  makeSelectActiveBook,
} from './selectors';
import Search from './Search';
import { searchRequest, selectBook, unselectBook, addBook } from './actions';

export class AddBookPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  selectBook = (index) => (
    () => {
      this.props.selectBook({ book: index });
    }
  )

  unselectBook = () => {
    this.props.unselectBook();
  }

  addBook = (book) => (
    () => {
      this.props.addBook({ book });
    }
  )

  render() {
    let currentBook = false;
    if (Number.isInteger(this.props.activeBook)) {
      currentBook = this.props.books[this.props.activeBook];
    }
    return (
      <div>
        <Helmet
          title="Add Book"
          meta={[
            { name: 'description', content: 'Description of AddBookPage' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>Search for Your Book</Title>
          <Row>
            <Col xs={12} xsOffset={0} sm={6} smOffset={3} md={4} mdOffset={4} >
              <Search search={this.props.searchRequest} />
            </Col>
          </Row>
          {this.props.books || this.props.searching ?
            <BookGrid books={this.props.books ? this.props.books : []} select={this.selectBook} loading={this.props.searching} /> :
            null
          }
        </div>
        <BookModal
          show={Number.isInteger(this.props.activeBook)}
          onHide={this.unselectBook}
          currentBook={currentBook}
          buttonText={'Add Book'}
          buttonAction={this.addBook(currentBook)}
          loading={this.props.searching}
        />
      </div>
    );
  }
}

AddBookPage.propTypes = {
  location: PropTypes.object,
  searchRequest: PropTypes.func.isRequired,
  searching: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  books: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  activeBook: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  selectBook: PropTypes.func.isRequired,
  unselectBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  searching: makeSelectSearching(),
  error: makeSelectError(),
  books: makeSelectBooks(),
  activeBook: makeSelectActiveBook(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchRequest: (payload) => dispatch(searchRequest(payload)),
    selectBook: (payload) => dispatch(selectBook(payload)),
    unselectBook: () => dispatch(unselectBook()),
    addBook: (payload) => dispatch(addBook(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);
