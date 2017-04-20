const express = require('express');
const fetch = require('node-fetch');

const User = require('./models/users');

const searchUrl = (searchTerms, startIndex = 0) => (
  `https://www.googleapis.com/books/v1/volumes?q=javascript&startIndex=${startIndex}&fields=items(id%2CvolumeInfo(authors%2CaverageRating%2Ccategories%2Cdescription%2CimageLinks%2Fthumbnail%2Clanguage%2CpageCount%2CpreviewLink%2CratingsCount%2Ctitle))&key=${process.env.GOOGLE_BOOKS_API_KEY}`
);

const formatData = (data) => (
  data.items.map((item) => (
    {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      description: item.volumeInfo.description,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories,
      thumbnail: item.volumeInfo.imageLinks.thumbnail,
      language: item.volumeInfo.language,
      previewLink: item.volumeInfo.previewLink,
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount,
    }
  ))
);

/*
  API routes
  ------------------------
*/
const apiRoutes = express.Router();

// apiRoutes.get('/books', (req, res) => {

// });

// http://localhost:3000/api/search?searchTerm=javascript
apiRoutes.get('/search', (req, res) => {
  if (!req.query.searchTerm) {
    res.json({ success: false, error: 'No search term provided' });
  } else {
    fetch(searchUrl(req.query.searchTerm, 0), {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'BookTradingDemo (gzip)',
      },
    }).then((response) => response.json())
    .then((json) => {
      // const formated = formatData(json);
      res.json({ success: true, data: formatData(json) });
    }).catch((err) => res.json({ success: false, error: err.message }));
  }
});

// Debugging routes

apiRoutes.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true, users });
    }
  });
});

apiRoutes.get('/deleteUsers', (req, res) => {
  User.remove({}, (err) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = apiRoutes;
