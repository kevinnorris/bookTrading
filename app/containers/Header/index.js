import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectToken } from 'containers/App/selectors';
import { logoutUser } from 'containers/App/actions';
import HeaderLink from 'components/HeaderLink';
import HeaderButton from 'components/HeaderButton';
import Wrapper from './Wrapper';
import Logo from './Logo';
import Icon from './Icon';
import Controls from './Controls';


function Header({ location, token, logout }) {
  let controls;
  if (token) {
    controls = (
      <Controls>
        {location !== '/dashboard' ? <HeaderLink to="/dashboard">Dashboard</HeaderLink> : null}
        <HeaderButton onClick={logout}>Sign Out</HeaderButton>
      </Controls>
    );
  } else {
    controls = (
      <Controls>
        {location !== '/login' ? <HeaderLink to="/login">Log In</HeaderLink> : null}
        {location !== '/signup' ? <HeaderLink to="/signup">Sign Up</HeaderLink> : null}
      </Controls>
    );
  }
  return (
    <Wrapper>
      <Logo to="/">
        <Icon className="glyphicon glyphicon-book" aria-hidden="true"></Icon>
        Book Trader
      </Logo>
      {controls}
    </Wrapper>
  );
}

Header.propTypes = {
  location: React.PropTypes.string.isRequired,
  token: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]).isRequired,
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
