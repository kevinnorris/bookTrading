import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import makeSelectAddBookPage from './selectors';

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

        </div>
      </div>
    );
  }
}

AddBookPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  AddBookPage: makeSelectAddBookPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);
