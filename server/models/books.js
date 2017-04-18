const mongoose = require('mongoose');

const Books = new mongoose.Schema({
  name: String,
  owner: String,
  googleData: {
    id: String,
    title: String,
    authors: [String],
    description: String,
    categories: [String],
    language: String,
    pageCount: Number,
    averageRating: Number,
    ratingsCount: Number,
    thumbnail: String,
    previewLink: String,
  },
  requests: [
    String,
  ],
});

module.exports = mongoose.model('Books', Books);
