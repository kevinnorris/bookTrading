import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import * as colors from 'utils/colors';
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

const Logo = styled(Link)`
  color: ${colors.primaryDarker};
  margin: 0;
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;

  &:hover{
    text-decoration: none;
    color: ${colors.primaryDarker};
  }
`;

const Icon = styled.span`
  padding-right: 4px;
  font-size: 2.5rem;
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
