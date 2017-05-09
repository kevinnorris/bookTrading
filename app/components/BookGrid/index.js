import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { primary } from 'utils/colors';
import Card from 'components/Card';
import Book from 'components/Book';
import Loader from 'components/Loader';

const GridCard = styled(Card)`
  background: ${primary};
`;

function BookGrid({ books, select, loading }) {
  const Books = books.map((book, index) => {
    // For books from our server
    if (book.googleData) {
      return (
        <Book
          imgUrl={book.googleData.thumbnail}
          title={book.googleData.title}
          isOwner={book.isOwner}
          hasRequested={book.hasRequested}
          index={index}
          select={select}
          key={index}
        />
      );
    }
    // For books from google search
    return (
      <Book
        imgUrl={book.thumbnail}
        title={book.title}
        index={index}
        select={select}
        key={index}
      />
    );
  }
  );
  return (
    <GridCard>
      {loading ? <Loader /> : null}
      <Row>
        {Books}
      </Row>
    </GridCard>
  );
}

BookGrid.propTypes = {
  books: React.PropTypes.array.isRequired,
  select: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
};

export default BookGrid;
