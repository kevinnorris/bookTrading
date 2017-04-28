import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import LinkButton from 'components/LinkButton';
import makeSelectMyBooksPage from './selectors';

export class MyBooksPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="My Books"
          meta={[
            { name: 'description', content: 'Books that have been added by user' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container">
          <LinkButton to={'/addbook'}>Add Book</LinkButton>
        </div>
      </div>
    );
  }
}

MyBooksPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  MyBooksPage: makeSelectMyBooksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBooksPage);
