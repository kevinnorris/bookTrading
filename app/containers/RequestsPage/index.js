import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import Title from 'components/Title';
import { getRequests, acceptRequest, cancelRequest, completeRequest } from './actions';
import { makeSelectFetching, makeSelectError, makeSelectRequests } from './selectors';

export class RequestsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getRequests();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Requests"
          meta={[
            { name: 'description', content: 'Book requests' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>In Progress - Donor</Title>
          <Title>In Progress - Recipient</Title>
          <Title>Pending</Title>
        </div>
      </div>
    );
  }
}

RequestsPage.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  requests: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  getRequests: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  completeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  requests: makeSelectRequests(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequests: () => dispatch(getRequests()),
    acceptRequest: (payload) => dispatch(acceptRequest(payload)),
    cancelRequest: (payload) => dispatch(cancelRequest(payload)),
    completeRequest: (payload) => dispatch(completeRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsPage);
