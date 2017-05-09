import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

import { primaryDarker } from 'utils/colors';
import Header from 'containers/Header';
import Title from 'components/Title';
import SubTitle from 'components/SubTitle';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import { makeSelectUserData } from 'containers/App/selectors';

const Notification = styled.p`
  color: ${primaryDarker};
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const SpacedCol = styled(Col)`
  margin-bottom: 10px;
`;

export class DashboardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Dashboard"
          meta={[
            { name: 'description', content: 'User dashboard for book trading' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>{this.props.userData.name}</Title>
          <Row>
            <SpacedCol xs={10} xsOffset={1} sm={6} smOffset={0} md={4} mdOffset={2}>
              <Card>
                <Title>My Books</Title>
                <SubTitle>10 Books Added</SubTitle>
                <LinkButton to={'/mybooks'}>View My Books</LinkButton>
              </Card>
            </SpacedCol>
            <SpacedCol xs={10} xsOffset={1} sm={6} smOffset={0} md={4} mdOffset={0}>
              <Card>
                <Title>Wishlist</Title>
                <SubTitle>5 Books Requested</SubTitle>
                <LinkButton to={'/browse'}>View Wishlist</LinkButton>
              </Card>
            </SpacedCol>
            <SpacedCol xs={10} xsOffset={1} sm={6} smOffset={0} md={4} mdOffset={2}>
              <Card>
                <Title>Requests</Title>
                <SubTitle>0 In Progress</SubTitle>
                <SubTitle>3 Pending</SubTitle>
                <LinkButton to={'/requests'}>View Requests</LinkButton>
              </Card>
            </SpacedCol>
            <SpacedCol xs={10} xsOffset={1} sm={6} smOffset={0} md={4} mdOffset={0}>
              <Card>
                <Title>Settings</Title>
                <SubTitle>Country: {this.props.userData.country}</SubTitle>
                <SubTitle>City: {this.props.userData.city}</SubTitle>
                <SubTitle>Zip: {this.props.userData.zip}</SubTitle>
                {!this.props.userData.country || !this.props.userData.city || !this.props.userData.zip ?
                  <Notification>Add your location to make youre requests more likely to be accepted</Notification> :
                  null
                }
                <LinkButton to={'/updateSettings'}>Update Settings</LinkButton>
              </Card>
            </SpacedCol>
          </Row>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  location: PropTypes.object,
  userData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
