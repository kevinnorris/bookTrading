import React from 'react';

import Button from 'components/Button';
import * as val from 'utils/fieldValidation';
import TextField from 'components/TextField';
import Title from 'components/Title';
import CenterCard from 'components/CenterCard';
import ServerError from 'components/ServerError';
import { restrictedPasswords } from 'utils/constants';

const fieldValidations = [
  val.ruleRunner('username', 'User Name', val.required, val.cantContain([' '])),
  val.ruleRunner('email', 'Email', val.mustContain('@')),
  val.ruleRunner('password1', 'Password', val.required, val.minLength(6),
                val.cantContain(restrictedPasswords, ['email', 'username'])),
  val.ruleRunner('password2', 'Password Confirmation', val.mustMatch('password1', 'Password')),
];


class SignupCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    signup: React.PropTypes.func.isRequired,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
  }

  static defaultProps = {
    error: '',
  }

  state = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    showErrors: false,
    validationErrors: {
      username: '',
      email: '',
      password1: '',
      password2: '',
    },
  }

  errorFor(field) {
    if (this.state.validationErrors[field]) {
      return this.state.validationErrors[field];
    }
    return '';
  }

  handelInputChange(field) {
    return (e) => {
      const newState = {
        ...this.state,
        [field]: e.target.value,
      };
      newState.validationErrors = val.run(newState, fieldValidations);
      this.setState(newState);
    };
  }

  handelSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showErrors: true,
    });
    // Check if validationErrors is empty
    if (Object.getOwnPropertyNames(this.state.validationErrors).length === 0) {
      // send to server
      this.props.signup({ username: this.state.username, email: this.state.email, password: this.state.password1 });
    }
  }

  render() {
    return (
      <CenterCard zLevel={1}>
        <Title className="SignupCard-title">Signup</Title>
        <form className={'text-left'} onSubmit={this.handelSubmit}>
          <TextField
            name="username"
            label="User Name *"
            placeHolder="User Name"
            showError={this.state.showErrors}
            text={this.state.username}
            isPassword={false}
            onFieldChange={this.handelInputChange('username')}
            errorText={this.errorFor('username')}
          />
          <TextField
            name="email"
            label="Email Address"
            placeHolder="Email address"
            showError={this.state.showErrors}
            text={this.state.email}
            isPassword={false}
            onFieldChange={this.handelInputChange('email')}
            errorText={this.errorFor('email')}
          />
          <TextField
            name="password1"
            label="Password *"
            placeHolder="Password"
            showError={this.state.showErrors}
            text={this.state.password1}
            isPassword
            onFieldChange={this.handelInputChange('password1')}
            errorText={this.errorFor('password1')}
          />
          <TextField
            name="password2"
            placeHolder="Confirm password"
            showError={this.state.showErrors}
            text={this.state.password2}
            isPassword
            onFieldChange={this.handelInputChange('password2')}
            errorText={this.errorFor('password2')}
          />
          <p>* required fields</p>
          <div className="text-center">
            {this.props.error ? <ServerError>{this.props.error}</ServerError> : ''}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CenterCard>
    );
  }
}

export default SignupCard;
