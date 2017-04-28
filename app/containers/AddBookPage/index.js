import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';

import Header from 'containers/Header';
import Title from 'components/Title';
import Card from 'components/Card';
import makeSelectAddBookPage from './selectors';
import Search from './Search';
import { searchRequest } from './actions';

export class AddBookPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="AddBookPage"
          meta={[
            { name: 'description', content: 'Description of AddBookPage' },
          ]}
        />
        <Header location={this.props.location.pathname} />
        <div className="container text-center">
          <Title>Search for Your Book</Title>
          <Row>
            <Col xs={12} xsOffset={0} sm={6} smOffset={3} md={4} mdOffset={4} >
              <Search search={this.props.searchRequest} />
            </Col>
          </Row>
          {this.props.AddBookPage.books ?
            <Card>
              <Row>
              </Row>
            </Card> :
            null
          }
        </div>
      </div>
    );
  }
}

AddBookPage.propTypes = {
  location: PropTypes.object,
  searchRequest: PropTypes.func.isRequired,
  AddBookPage: PropTypes.shape({
    searching: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    books: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    selectedBook: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }),
};

const mapStateToProps = createStructuredSelector({
  AddBookPage: makeSelectAddBookPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchRequest: (payload) => dispatch(searchRequest(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookPage);
