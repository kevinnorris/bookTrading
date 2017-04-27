/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Header from 'containers/Header';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Header location={this.props.location.pathname} />
        <div className="container">
          <h1 className="text-center">
            Page Not Found
          </h1>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  location: React.PropTypes.object,
};
