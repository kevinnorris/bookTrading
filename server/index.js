/* eslint consistent-return:0 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const api = require('./api');
require('./passportConfig')(passport);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI);

// add body parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// add passport.js
app.use(passport.initialize());

/*
  Local authentication
  ------------------------
*/

// Builds the json to be sent back as response, either errors or token
const parsePassport = (user, info) => {
  // if user does not exist
  if (!user) {
    return { success: false, error: info.message, status: info.status };
  }
  const token = jwt.sign({
    sub: user._id,
    iss: process.env.APP_URL,
    iat: (new Date().getTime()),
  }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  /**
   * Remove password before sending data to client
   * Set to undefined so it does not show up as a key to the client
   * When object is stringified it does not keep keys that have value of undefined
   */
  user.password = undefined;

  return { success: true, token, user, expiresIn: 14400000 };
};

app.route('/auth/signup')
  .post((req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) return next(err);
      return res.json(parsePassport(user, info));
    })(req, res, next);
  });

app.route('/auth/login')
  .post((req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) return next(err);

      return res.json(parsePassport(user, info));
    })(req, res, next);
  });

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
app.use('/api', api);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
