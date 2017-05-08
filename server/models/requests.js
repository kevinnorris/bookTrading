const mongoose = require('mongoose');

const Requests = new mongoose.Schema({
  requestingUser: String,
  requestDate: Number,
  bookOwner: String,
  bookId: String,
  accepted: Boolean,
});

module.exports = mongoose.model('Requests', Requests);
