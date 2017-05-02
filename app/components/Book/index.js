import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled(Col)`
  padding: 5px;
  margin-bottom: 5px;
  height: 190px;
`;

const BookImg = styled.img`
  height: 80%;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    cursor: pointer;
    height: 100%;
  }
`;

function Book({ imgUrl, title, index, select }) {
  return (
    <Wrapper xs={6} sm={4} md={3}>
      <BookImg src={imgUrl} alt={title} onClick={select(index)}></BookImg>
    </Wrapper>
  );
}

Book.propTypes = {
  imgUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  select: React.PropTypes.func.isRequired,
};

export default Book;
