import React from 'react';
import styled from 'styled-components';

import * as colors from 'utils/colors';
import Logo from 'components/Header/Logo';
import Icon from 'components/Header/Icon';
import Login from './Login';

const Wrapper = styled.div`
  background: ${colors.primary};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
  margin-bottom: 1em;

  @media (min-width: 770px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

function Header() {
  return (
    <Wrapper>
      <Logo to="/">
        <Icon className="glyphicon glyphicon-book" aria-hidden="true"></Icon>
        Book Trader
      </Logo>
      <Login login={(username, pass) => console.log(`login called with username: ${username} and pass: ${pass}`)} />
    </Wrapper>
  );
}

Header.propTypes = {

};

export default Header;
