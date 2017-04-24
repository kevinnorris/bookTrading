import React from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import * as colors from 'utils/colors';

const LoginInput = styled(FormControl)`
  margin-right: 4px;
  display: inline-block;
  width: auto;
  vertical-align: middle;
`;
const LoginButton = styled(Button)`
  background: ${colors.primaryDarker};
  color: white;
  &:hover{
    background: ${colors.darkerHover};
    color: white;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
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
    console.log('form submited');
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <Wrapper>
        <Form inline onSubmit={this.handelSubmit}>
          <LoginInput
            className="LoginCard-input"
            bsSize="sm"
            name="username"
            type="text"
            placeholder="username"
            value={this.state.username}
            onChange={this.handelInputChange('username')}
          />
          <LoginInput
            className="LoginCard-input"
            bsSize="sm"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
          <LoginButton type={'submit'}>Login</LoginButton>
        </Form>
        {this.props.error ? <span>{this.props.error}</span> : null}
      </Wrapper>
    );
  }
}
