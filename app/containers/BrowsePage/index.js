import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import Title from 'components/Title';
import makeSelectBrowsePage from './selectors';

export class BrowsePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Browse Books"
          meta={[
            { name: 'description', content: 'Browse available books' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>Browse Available Books</Title>
        </div>
      </div>
    );
  }
}

BrowsePage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  BrowsPage: makeSelectBrowsePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
