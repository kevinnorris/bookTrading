import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import { primary } from 'utils/colors';

const Wrapper = styled(Row)`
  display: flex;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid ${primary};
  margin-bottom: 2px;
`;

const ItemBox = styled.p`
  padding: 4px 6px;
  margin: 0;
`;

const LabelBox = styled(ItemBox)`
  font-weight: bold;
`;

const AcceptBtn = styled.button`
  border-radius: 100%;
  background: green;
  color: white;
  padding: 6px 8px;
`;

const CancelBtn = styled(AcceptBtn)`
  background: red;
`;

function RequestListItem({ bookTitle, requestDate, name, country, city, zip, email, accepted, isLabel }) {
  const Box = isLabel ? LabelBox : ItemBox;
  return (
    <Wrapper>
      <Col xs={2}>
        <Box>{name}</Box>
      </Col>
      <Col xs={3}>
        <Box>{bookTitle}</Box>
      </Col>
      <Col xs={2}>
        <Box>{isLabel ? requestDate : new Date(requestDate).toLocaleDateString()}</Box>
      </Col>
      <Col xs={3}>
        {accepted ?
          <Box>{email}</Box> :
          <Box>
            {city}{country ? `, ${country}` : ''}{zip ? `, ${zip}` : ''}
          </Box>
        }
      </Col>
      <Col xs={2}>
        {isLabel ?
          <Box>Accept</Box> :
          <AcceptBtn>
            <span className={'glyphicon glyphicon-ok'} aria-hidden="true"></span>
          </AcceptBtn>
        }
      </Col>
    </Wrapper>
  );
}

RequestListItem.propTypes = {
  bookTitle: React.PropTypes.string.isRequired,
  requestDate: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]).isRequired,
  name: React.PropTypes.string.isRequired,
  country: React.PropTypes.string,
  city: React.PropTypes.string,
  zip: React.PropTypes.string,
  email: React.PropTypes.string,
  accepted: React.PropTypes.bool,
  isLabel: React.PropTypes.bool,
};

export default RequestListItem;
