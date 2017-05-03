/* eslint prefer-arrow-callback: 0*/
const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const User = require('./models/users');
const Book = require('./models/books');
const Request = require('./models/requests');

const searchUrl = (searchTerms, startIndex = 0) => (
  `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&startIndex=${startIndex}&fields=items(id%2CvolumeInfo(authors%2CaverageRating%2Ccategories%2Cdescription%2CimageLinks%2Fthumbnail%2Clanguage%2CpageCount%2CpreviewLink%2CratingsCount%2Ctitle))&key=${process.env.GOOGLE_BOOKS_API_KEY}`
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
      thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://books.google.co.nz/googlebooks/images/no_cover_thumb.gif',
      language: item.volumeInfo.language,
      previewLink: item.volumeInfo.previewLink,
      averageRating: item.volumeInfo.averageRating,
      ratingsCount: item.volumeInfo.ratingsCount,
    }
  ))
);

/*
  User Json Web Token verification middleware
  ----------------------
*/
function tokenVerify(req, res, next) {
  // check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const userId = req.body.userId || req.query.userId;

  // decode token
  if (token && userId) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        res.json({ success: false, error: err.message });
      } else {
        if (decoded.sub === userId) {
          // if all is well, save to request for use in other routes
          req.decoded = decoded;
          return next();
        }
        return res.json({ success: false, error: 'Failed to authenticate token.' });
      }
    });
  } else {
    // no token
    res.status(403).json({ success: false, error: 'No token and/or userId provided.' });
  }
}

/*
  API routes
  ------------------------
*/
const apiRoutes = express.Router();

// apiRoutes.get('/books', (req, res) => {

// });

// http://localhost:3000/api/search?searchTerm=javascript
apiRoutes.get('/search', tokenVerify, (req, res) => {
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

apiRoutes.post('/addBook', tokenVerify, (req, res) => {
  // Check required info is passed
  if (req.body.googleData) {
    const newBook = new Book();

    newBook.owner = req.body.userId;
    newBook.googleData = req.body.googleData;
    newBook.requests = [];

    newBook.save((e) => {
      if (e) throw e;
      res.json({ success: true });
    });
  } else {
    res.json({ success: false, error: 'Required data not provided' });
  }
});

apiRoutes.post('/removeBook', tokenVerify, (req, res) => {
  if (req.body.bookId) {
    Book.remove({ _id: req.body.bookId }, function (err) {
      if (!err) {
        return res.json({ success: true });
      }
      return res.json({ success: false, error: err.message });
    });
  } else {
    res.json({ success: false, error: 'No book id provided.' });
  }
});

apiRoutes.post('/requestBook', tokenVerify, (req, res) => {
  if (req.body.bookId) {
    const newReq = new Request();

    newReq.requestingUser = req.body.userId;
    newReq.requestDate = Date.now();
    newReq.bookId = req.body.bookId;
    newReq.accepted = false;

    newReq.save((e) => {
      if (e) throw e;
      res.json({ success: true });
    });
  } else {
    res.json({ success: false, error: 'Book id not provided.' });
  }
});

apiRoutes.post('/removeRequest', tokenVerify, (req, res) => {
  if (req.body.requestId) {
    Request.remove({ _id: req.body.requestId }, function (err) {
      if (!err) {
        res.json({ success: true });
      } else {
        res.json({ success: false, error: err.message });
      }
    });
  } else {
    res.json({ success: false, error: 'No request id provided.' });
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

apiRoutes.get('/books', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true, books });
    }
  });
});

apiRoutes.get('/requests', (req, res) => {
  Request.find({}, (err, requests) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true, requests });
    }
  });
});

module.exports = apiRoutes;
