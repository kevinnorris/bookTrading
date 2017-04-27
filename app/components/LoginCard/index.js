import React from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import Button from 'components/Button';
import CenterCard from 'components/CenterCard';
import Title from 'components/Title';
import ServerError from 'components/ServerError';

const MarginFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

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
    username: '',
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
    this.props.login({ username: this.state.username, password: this.state.password });
  }

  render() {
    return (
      <CenterCard className="LoginCard">
        <Title className="LoginCard-title">Login</Title>
        <form onSubmit={this.handelSubmit}>
          <MarginFormControl
            className="LoginCard-input"
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handelInputChange('username')}
          />
          <FormControl
            className="LoginCard-input"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
          {this.props.error ? <ServerError>{this.props.error}</ServerError> : ''}
          <Button type="submit">Submit</Button>
        </form>
      </CenterCard>
    );
  }
}
