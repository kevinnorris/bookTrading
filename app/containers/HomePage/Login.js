import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

import HeaderButton from 'components/HeaderButton';

const LoginInput = styled(FormControl)`
  margin-right: 4px;
  display: inline-block;
  width: auto;
  vertical-align: middle;
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
            placeholder="password"
            value={this.state.password}
            onChange={this.handelInputChange('password')}
          />
          <HeaderButton type={'submit'}>Login</HeaderButton>
        </Form>
        {this.props.error ? <span>{this.props.error}</span> : null}
      </Wrapper>
    );
  }
}
