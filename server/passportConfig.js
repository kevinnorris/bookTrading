/* eslint consistent-return:0 */
/* eslint object-shorthand:0 */
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/users');

module.exports = (passport) => {
  // passportjs with oauth always requires sessions for the initial oauth handshake
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  // use LocalStragegy
  // Using named strategies, one for login and one for signup
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
    // If email already used by a user
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(null, false, { message: err.message, status: 500 });
        }
        // Can't have two users with same username
        if (user) {
          return done(null, false, { message: 'Username already in use.', status: 400 });
        }
        // if new username, create new user
        const newUser = new User();

        newUser.username = username;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(password);
        newUser.name = req.body.name;
        newUser.city = req.body.city;
        newUser.state = req.body.state;
        newUser.country = req.body.country;
        newUser.points = 0;

        newUser.save((e) => {
          if (e) throw e;
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use('local-login', new LocalStrategy(
  (username, password, done) => {
    process.nextTick(() => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'User does not exist', status: 400 });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Password is incorrect', status: 400 });
        }

        return done(null, user);
      });
    });
  }));
};
