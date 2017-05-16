import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import { primary, actionColor, actionHover, deleteColor, deleteHover } from 'utils/colors';

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
  background: ${actionColor};
  color: white;
  padding: 6px 8px;
  margin: 2px;
  
  &:hover, &:active, &:focus{
    background: ${actionHover};
    color: white;
    text-decoration: none;
  }
`;

const CancelBtn = styled(AcceptBtn)`
  background: ${deleteColor};

  &:hover, &:active, &:focus{
    background: ${deleteHover};
  }
`;

function RequestListItem({
  bookTitle,
  requestDate,
  name,
  country,
  city,
  zip,
  email,
  accepted,
  isLabel,
  onClick,
  deleteButton,
  buttonLabel,
}) {
  const Box = isLabel ? LabelBox : ItemBox;
  const Button = deleteButton ? CancelBtn : AcceptBtn;
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
          <Box>{isLabel ? email : <a href={`mailto:${email}`} target="_top">{email}</a>}</Box> :
          <Box>
            {city}{country ? `, ${country}` : ''}{zip ? `, ${zip}` : ''}
          </Box>
        }
      </Col>
      <Col xs={2}>
        {isLabel ?
          <Box>{buttonLabel}</Box> :
          <Button onClick={onClick}>
            <span className={'glyphicon glyphicon-ok'} aria-hidden="true"></span>
          </Button>
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
  onClick: React.PropTypes.func,
  deleteButton: React.PropTypes.bool,
  buttonLabel: React.PropTypes.string,
};

export default RequestListItem;
