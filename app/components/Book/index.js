import React from 'react';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { ownerColor, requestedColor } from 'utils/colors';

const Wrapper = styled(Col)`
  padding: 5px;
  margin-bottom: 5px;
  height: 220px;
`;

const Background = styled.div`
  position: relative;
  border-radius: 5px;
  width: 165px;
  height: 100%;
  padding: 5px;
  margin: 0 auto;
  overflow: hidden;

  background: ${props => props.isOwner ? ownerColor : (props.requested ? requestedColor : 'transparent')};
`;

const BookImg = styled.img`
  height: 85%;
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  &:hover {
    cursor: pointer;
    height: 100%;
  }
`;

const Label = styled.p`
  margin: 0;
  padding-top: 2px;
  font-weight: bold;
  text-align: center;
`;

function Book({ imgUrl, title, isOwner, hasRequested, index, select }) {
  let label = 'Requested';
  if (isOwner) {
    label = 'My Book';
  }
  return (
    <Wrapper xs={6} sm={4} md={3}>
      <Background isOwner={isOwner} requested={hasRequested} >
        <BookImg src={imgUrl} alt={title} onClick={select(index)}></BookImg>
        {isOwner || hasRequested ? <Label>{label}</Label> : null}
      </Background>
    </Wrapper>
  );
}

Book.propTypes = {
  imgUrl: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  isOwner: React.PropTypes.bool,
  hasRequested: React.PropTypes.bool,
  index: React.PropTypes.number.isRequired,
  select: React.PropTypes.func.isRequired,
};

export default Book;
