const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define schema
const User = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  city: String,
  country: String,
  zip: String,
});

// Methods
User.methods.generateHash = (password) => (
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
);

// Uses function instead of arrow function so that 'this' has proper value
User.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Create model and expose it
module.exports = mongoose.model('User', User);
