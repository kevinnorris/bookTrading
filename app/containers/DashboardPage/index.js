import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from 'containers/Header';
import LinkButton from 'components/LinkButton';

export class DashboardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'User dashboard for book trading' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container">
          <LinkButton to={'/mybooks'}>My Books</LinkButton>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(DashboardPage);
