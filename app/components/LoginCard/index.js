import React from 'react';
import { FormControl } from 'react-bootstrap';

import ActionButton from 'components/ActionButton';
import CenterCard from 'components/CenterCard';
import Title from 'components/Title';
import ServerError from 'components/ServerError';
import MarginFormControl from 'components/MarginFormControl';

export default class LoginCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    login: React.PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: '',
  }

  state = {
    email: '',
    password: '',
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
    this.props.login({ email: this.state.email, password: this.state.password });
  }

  render() {
    return (
      <CenterCard>
        <Title>Login</Title>
        <form onSubmit={this.handelSubmit}>
          <MarginFormControl
            name="email"
            type="text"
            placeholder="email"
            value={this.state.email}
            onChange={this.handelInputChange('email')}
          />
          <FormControl
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
          {this.props.error ? <ServerError>{this.props.error}</ServerError> : ''}
          <ActionButton type="submit">Submit</ActionButton>
        </form>
      </CenterCard>
    );
  }
}
