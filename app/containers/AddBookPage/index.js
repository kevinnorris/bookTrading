import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import makeSelectAddBookPage from './selectors';
import Search from './Search';
import { searchRequest } from './actions';

export class AddBookPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="AddBookPage"
          meta={[
            { name: 'description', content: 'Description of AddBookPage' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container">
          <Search search={this.props.searchRequest} />
        </div>
      </div>
    );
  }
}

AddBookPage.propTypes = {
  location: PropTypes.object,
  searchRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  AddBookPage: makeSelectAddBookPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchRequest: (payload) => dispatch(searchRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);
