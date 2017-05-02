import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Modal, Button } from 'react-bootstrap';

import Header from 'containers/Header';
import Title from 'components/Title';
import BookGrid from 'components/BookGrid';
import {
  makeSelectSearching,
  makeSelectError,
  makeSelectBooks,
  makeSelectActiveBook,
} from './selectors';
import Search from './Search';
import { searchRequest, selectBook, unselectBook } from './actions';
import ModalWrapper from './ModalWrapper';

export class AddBookPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  selectBook = (index) => (
    () => {
      this.props.selectBook({ book: index });
    }
  )

  unselectBook = () => {
    this.props.unselectBook();
  }

  render() {
    let currentBook;
    if (Number.isInteger(this.props.activeBook)) {
      currentBook = this.props.books[this.props.activeBook];
      console.log(currentBook);
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
          {this.props.books ?
            <BookGrid books={this.props.books} select={this.selectBook} /> :
            null
          }
        </div>
        <Modal show={Number.isInteger(this.props.activeBook)} onHide={this.unselectBook}>
          {currentBook ?
            <Modal.Body>
              <ModalWrapper>
                <div>
                  <p>
                    <b>Title:</b> {currentBook.title}
                  </p>
                  <p>
                    <b>Author(s):</b> {currentBook.authors ? currentBook.authors.join(', ') : ''}
                  </p>
                  <p>
                    <b>Categorie(s):</b> {currentBook.categories ? currentBook.categories.join(', ') : ''}
                  </p>
                  <p>
                    <b>Language:</b> {currentBook.language}
                  </p>
                  <p>
                    <b>Pages:</b> {currentBook.pageCount}
                  </p>
                  <p>
                    <b>Average Rating:</b> {currentBook.averageRating}
                  </p>
                  <p>
                    <b>Rating Count:</b> {currentBook.ratingsCount || 0}
                  </p>
                </div>
                <div>
                  <a href={currentBook.previewLink} target="blank" rel="noopener noreferrer">
                    <img src={currentBook.thumbnail} alt={currentBook.title} />
                  </a>
                </div>
              </ModalWrapper>
              <p>
                <b>Description:</b> {currentBook.description}
              </p>
            </Modal.Body> :
            null
          }
          <Modal.Footer>
            <Button onClick={this.unselectBook}>Close</Button>
          </Modal.Footer>
        </Modal>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);
