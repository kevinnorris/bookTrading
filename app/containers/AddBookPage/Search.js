import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

// import styled from 'styled-components';

export default class LoginCard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    search: React.PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  handelInputChange = (e) => {
    const newState = {
      searchTerm: e.target.value,
    };
    this.setState(newState);
  }

  handelSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchTerm.length > 0) {
      this.props.search({ searchTerm: this.state.searchTerm });
    }
  }

  render() {
    return (
      <form onSubmit={this.handelSubmit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Book"
              onChange={this.handelInputChange}
            />
            <InputGroup.Button>
              <Button type="submit">Search</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
}
