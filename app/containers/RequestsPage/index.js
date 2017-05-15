import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import Title from 'components/Title';
import { makeSelectUserId } from 'containers/App/selectors';
import { getRequests, acceptRequest, cancelRequest, completeRequest } from './actions';
import { makeSelectFetching, makeSelectError, makeSelectRequests } from './selectors';
import RequestList from './RequestList';

export class RequestsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getRequests();
  }

  render() {
    let pendingRequests = [];
    let donorRequests = [];
    let recipientRequests = [];
    let jsRequests = [];
    if (this.props.requests) {
      jsRequests = this.props.requests.toJS();
      // Sort requests into display categories
      for (let i = 0; i < jsRequests.length; i += 1) {
        if (!jsRequests[i].accepted) {
          pendingRequests.push(jsRequests[i]);
        } else if (jsRequests[i].bookOwner === this.props.userId) {
          donorRequests.push(jsRequests[i]);
        } else {
          recipientRequests.push(jsRequests[i]);
        }
      }
    }
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
          <RequestList requests={donorRequests} inProgress />
          <Title>In Progress - Recipient</Title>
          <RequestList requests={recipientRequests} inProgress />
          <Title>Pending</Title>
          <RequestList requests={pendingRequests} />
        </div>
      </div>
    );
  }
}

RequestsPage.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  requests: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  userId: PropTypes.string.isRequired,
  getRequests: PropTypes.func.isRequired,
  acceptRequest: PropTypes.func.isRequired,
  cancelRequest: PropTypes.func.isRequired,
  completeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  requests: makeSelectRequests(),
  userId: makeSelectUserId(),
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
