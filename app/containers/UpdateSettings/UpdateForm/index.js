import React from 'react';
import { FormControl } from 'react-bootstrap';

import ActionButton from 'components/ActionButton';
import CenterCard from 'components/CenterCard';
import Title from 'components/Title';
import ServerError from 'components/ServerError';
import MarginFormControl from 'components/MarginFormControl';
import Loader from 'components/Loader';

export default class UpdateForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    updateSettings: React.PropTypes.func.isRequired,
    fetching: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string,
    country: React.PropTypes.string,
    city: React.PropTypes.string,
    zip: React.PropTypes.string,
  }

  static defaultProps = {
    error: '',
  }

  state = {
    name: this.props.name,
    city: this.props.city,
    country: this.props.country,
    zip: this.props.zip,
  }

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
      };
      this.setState(newState);
    };
  }

  handelSubmit = (e) => {
    e.preventDefault();
    this.props.updateSettings({
      name: this.state.name,
      country: this.state.country,
      city: this.state.city,
      zip: this.state.zip,
    });
  }

  render() {
    return (
      <CenterCard>
        <Title>Update Settings</Title>
        <form onSubmit={this.handelSubmit}>
          <MarginFormControl
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handelInputChange('name')}
          />
          <MarginFormControl
            name="country"
            type="text"
            placeholder="Country"
            value={this.state.country}
            onChange={this.handelInputChange('country')}
          />
          <MarginFormControl
            name="city"
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={this.handelInputChange('city')}
          />
          <FormControl
            name="zip"
            type="text"
            placeholder="Zip Code"
            value={this.state.zip}
            onChange={this.handelInputChange('zip')}
          />
          {this.props.error ? <ServerError>{this.props.error}</ServerError> : ''}
          {this.props.fetching ? <Loader /> : <ActionButton type="submit">Submit</ActionButton>}
        </form>
      </CenterCard>
    );
  }
}
