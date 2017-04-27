import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { loginRequest } from 'containers/App/actions';
import { makeSelectError } from 'containers/App/selectors';
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
        <Header location={this.props.location.pathname} />
        <div className="container">
          <LoginCard login={this.props.login} error={this.props.error} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
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
    login: (payload) => dispatch(loginRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
