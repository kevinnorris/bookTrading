import React from 'react';
import styled from 'styled-components';
import { Row } from 'react-bootstrap';
import { primary } from 'utils/colors';
import Card from 'components/Card';
import Book from 'components/Book';

const GridCard = styled(Card)`
  background: ${primary};
`;

function BookGrid({ books, select }) {
  const Books = books.map((book, index) => (<Book imgUrl={book.thumbnail} title={book.title} index={index} select={select} key={index} />));
  return (
    <GridCard>
      <Row>
        {Books}
      </Row>
    </GridCard>
  );
}

BookGrid.propTypes = {
  books: React.PropTypes.array.isRequired,
  select: React.PropTypes.func.isRequired,
};

export default BookGrid;
