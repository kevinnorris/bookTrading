/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';

import { loginRequest } from 'containers/App/actions';
import { makeSelectError } from 'containers/App/selectors';
import Title from 'components/Title';
import Header from './Header';
import StepBox from './StepBox';
import NavBox from './NavBox';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Header login={this.props.login} error={this.props.error} />
        <div className="container text-center">
          <Title>How It Works</Title>
          <Row>
            <Col sm={4} md={3}>
              <StepBox num={1} icon={'book'} text={'Input books you want to give away'} />
            </Col>
            <Col sm={4} md={3}>
              <StepBox num={2} icon={'envelope'} text={'Receive requests for your books'} />
            </Col>
            <Col sm={4} md={3}>
              <StepBox num={3} icon={'send'} text={'Send your books and receive points'} />
            </Col>
            <Col sm={4} smOffset={4} md={3} mdOffset={0}>
              <StepBox num={4} icon={'pencil'} text={'Request books with your points'} />
            </Col>
          </Row>
          <NavBox />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: (payload) => dispatch(loginRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
