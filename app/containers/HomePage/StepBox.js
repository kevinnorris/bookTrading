import React from 'react';
import styled from 'styled-components';
import * as colors from 'utils/colors';

const Wrapper = styled.div`
  border: ${colors.primaryDark} 2px solid;
  border-radius: 5px;
  padding: 12.5px;
  text-align: left;
  margin: 5px 0;

  @media (max-width: 767px) {
    margin: 5px 50px;
  }
`;

const Number = styled.h2`
  margin: 0;
  color: ${colors.primaryDark};
`;

const Description = styled.p`
  padding-left: 10px;
  font-size: 1.8rem;
  text-align: center;
`;

const Icon = styled.span`
  font-size: 2.5rem;
  color: ${colors.primaryDark};
`;

function StepBox({ num, icon, text }) {
  return (
    <Wrapper>
      <Number>{num}.</Number>
      <Description>
        <Icon className={`glyphicon glyphicon-${icon}`} aria-hidden="true"></Icon>
        <br />
        {text}
      </Description>
    </Wrapper>
  );
}

StepBox.propTypes = {
  num: React.PropTypes.number,
  icon: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default StepBox;
