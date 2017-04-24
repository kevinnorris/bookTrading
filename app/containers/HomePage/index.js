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

import React from 'react';
import LinkButton from 'components/LinkButton';
import Header from './Header';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className={'center-block'}>
            <h2>How it works</h2>
            <ol>
              <li>Input books you want to give away</li>
              <li>Receive request from for your books from others</li>
              <li>Send your books to and receive points</li>
              <li>Request books with your points</li>
            </ol>
          </div>
          <LinkButton to="/login">Log In</LinkButton>
          <LinkButton to="/signup">Sign Up</LinkButton>
          <LinkButton to="/brows">Brows Books</LinkButton>
        </div>
      </div>
    );
  }
}
