import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectToken } from 'containers/App/selectors';
import HeaderLink from 'components/HeaderLink';
import Wrapper from './Wrapper';
import Logo from './Logo';
import Icon from './Icon';
import Controls from './Controls';


function Header({ location }) {
  return (
    <Wrapper>
      <Logo to="/">
        <Icon className="glyphicon glyphicon-book" aria-hidden="true"></Icon>
        Book Trader
      </Logo>
      <Controls>
        {location !== '/login' ? <HeaderLink to="/login">Log In</HeaderLink> : null}
        {location !== '/signup' ? <HeaderLink to="/signup">Sign Up</HeaderLink> : null}
      </Controls>
    </Wrapper>
  );
}

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectToken(),
});

export default connect(mapStateToProps, null)(Header);
