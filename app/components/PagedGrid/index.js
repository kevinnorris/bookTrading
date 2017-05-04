import React from 'react';
// import styled from 'styled-components';
import { Pagination } from 'react-bootstrap';
import BookGrid from 'components/BookGrid';


function PagedGrid({ numPages, activePage, selectPage, books, selectBook }) {
  return (
    <div>
      <BookGrid books={books} select={selectBook} />
      <Pagination
        prev
        next
        ellipsis
        boundaryLinks
        items={numPages}
        maxButtons={5}
        activePage={activePage}
        onSelect={selectPage}
      />
    </div>
  );
}

PagedGrid.propTypes = {
  books: React.PropTypes.array.isRequired,
  numPages: React.PropTypes.number.isRequired,
  activePage: React.PropTypes.number.isRequired,
  selectPage: React.PropTypes.func.isRequired,
  selectBook: React.PropTypes.func,
};

export default PagedGrid;
