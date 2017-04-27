import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { signupRequest } from 'containers/App/actions';
import { makeSelectError } from 'containers/App/selectors';
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
        <Header location={this.props.location.pathname} />
        <div className="container">
          <SignupCard signup={this.props.signup} error={this.props.error} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func.isRequired,
  location: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    signup: (payload) => dispatch(signupRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
