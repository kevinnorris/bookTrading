/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from 'components/Header';
import LoginCard from 'components/LoginCard';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Login Page"
          meta={[
            { name: 'description', content: 'Login Page of Book Trader application' },
          ]}
        />
        <Header />
        <div className="container">
          <LoginCard login={() => { console.log('loging in'); }} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
