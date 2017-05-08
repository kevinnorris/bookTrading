import React from 'react';
import styled from 'styled-components';

import LinkButton from 'components/LinkButton';
import * as colors from 'utils/colors';
import Title from 'components/Title';

const Wrapper = styled.div`
  border: ${colors.primaryDark} 2px solid;
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  padding: 1em;
  margin-bottom: 1em;
`;

function NavBox() {
  return (
    <Wrapper>
      <Title>New Here?</Title>
      <LinkButton to="/signup">Create An Account</LinkButton>
      <LinkButton to="/browse">Browse Books</LinkButton>
    </Wrapper>
  );
}

NavBox.propTypes = {

};

export default NavBox;
