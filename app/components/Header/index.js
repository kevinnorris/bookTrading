import React from 'react';
import { Link } from 'react-router';

import HeaderLink from 'components/HeaderLink';
import Wrapper from './Wrapper';
import Logo from './Logo';
import Icon from './Icon';
import Controls from './Controls';


function Header({ location }) {
  console.log(location);
  return (
    <Wrapper>
      <Logo to="/">
        <Icon className="glyphicon glyphicon-book" aria-hidden="true"></Icon>
        Book Trader
      </Logo>
      <Controls>
        <HeaderLink to="/login">Log In</HeaderLink>
        <HeaderLink to="/signup">Sign Up</HeaderLink>
      </Controls>
    </Wrapper>
  );
}

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
};

export default Header;
