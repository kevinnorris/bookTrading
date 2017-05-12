import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import Header from 'containers/Header';
import { updateSettingsRequest } from 'containers/App/actions';
import { makeSelectFetching, makeSelectError, makeSelectUserData } from 'containers/App/selectors';
import UpdateForm from './UpdateForm';

export class UpdateSettings extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Update Settings"
          meta={[
            { name: 'description', content: 'Update account settings' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <UpdateForm
            updateSettings={this.props.updateSettingsRequest}
            error={this.props.error}
            fetching={this.props.fetching}
            name={this.props.userData.name}
            country={this.props.userData.country}
            city={this.props.userData.city}
            zip={this.props.userData.zip}
          />
        </div>
      </div>
    );
  }
}

UpdateSettings.propTypes = {
  location: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  updateSettingsRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetching: makeSelectFetching(),
  error: makeSelectError(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateSettingsRequest: (payload) => dispatch(updateSettingsRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSettings);
