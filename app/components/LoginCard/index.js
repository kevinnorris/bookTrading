import React from 'react';
import { FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import Button from 'components/Button';
import CenterCard from 'components/CenterCard';
import Title from 'components/Title';

const MarginFormControl = styled(FormControl)`
  margin-bottom: 15px;
`;

const ServerError = styled.p`
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default class LoginCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    error: React.PropTypes.string,
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
    console.log('form submited');
    e.preventDefault();
    // this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <CenterCard className="LoginCard">
        <Title className="LoginCard-title">Login</Title>
        <form onSubmit={this.handelSubmit}>
          <MarginFormControl
            className="LoginCard-input"
            name="email"
            type="text"
            placeholder="Email address"
            value={this.state.email}
            onChange={this.handelInputChange('email')}
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
