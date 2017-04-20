/*
 *
 * SignupPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from 'components/Header';
import SignupCard from 'components/SignupCard';

export class SignupPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Signup Page"
          meta={[
            { name: 'description', content: 'Signup Page of Book Trader application' },
          ]}
        />
        <Header />
        <div className="container">
          <SignupCard signup={() => { console.log('signup'); }} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(SignupPage);
