/**
*
* Header
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import Wrapper from './Wrapper';
import Controls from './Controls';

const Logo = styled(Link)`
  color: darkblue;
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

function Header() {
  return (
    <Wrapper>
      <Logo to="/">Book Trader</Logo>
      <Controls>
        <Link to="/login">Log In</Link>
        |
        <Link to="/signup">Sign Up</Link>
      </Controls>
    </Wrapper>
  );
}

Header.propTypes = {

};

export default Header;
