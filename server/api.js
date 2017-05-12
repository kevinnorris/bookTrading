/* eslint prefer-arrow-callback: 0*/
/* eslint no-underscore-dangle: 0*/
const express = require('express');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const User = require('./models/users');
const Book = require('./models/books');
const Request = require('./models/requests');

const searchUrl = (searchTerms, startIndex = 0) => (
  `https://www.googleapis.com/books/v1/volumes?q=${searchTerms}&startIndex=${startIndex}&fields=items(id%2CvolumeInfo(authors%2CaverageRating%2Ccategories%2Cdescription%2CimageLinks%2Fthumbnail%2Clanguage%2CpageCount%2CpreviewLink%2CratingsCount%2Ctitle))&key=${process.env.GOOGLE_BOOKS_API_KEY}`
);
const BooksPerPage = 12;
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
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ success: false, error: err.message });
      } else if (decoded.sub === userId) {
        // if all is well, save to request for use in other routes
        req.decoded = decoded;
        next();
      } else {
        res.json({ success: false, error: 'Failed to authenticate token.' });
      }
    });
  } else {
    // no token
    res.status(403).json({ success: false, error: 'No token and/or userId provided.' });
  }
}

/**
 * Retrieves a page of books based on parameters, or returns an error
 * Returns an object to callback with (success: boolean) and either (error: message) or (books: [{book},{book}]), numpages: number)
 * @param {Number} booksPerPage
 * @param {Object} filterBy mongoose query
 * @param {Object} sortBy mongoose query
 * @param {Number} activePage
 * @param {Function} callback
 */
function getBooks(res, booksPerPage, filterBy, sortBy, activePage, callback) {
  Book.count(filterBy, (e, count) => {
    if (e) {
      callback({ success: false, message: e.message });
    }
    const numPages = Math.ceil(count / booksPerPage);

    // Get page worth of books
    if (activePage) {
      Book.find().where(filterBy).sort(sortBy).limit(booksPerPage)
      .skip(booksPerPage * (activePage - 1))
        .exec((err, books) => {
          if (err) {
            callback({ success: false, message: err.message });
          } else {
            callback({ success: true, books, numPages });
          }
        });
    } else {
      Book.find().where(filterBy).sort(sortBy).limit(booksPerPage)
        .exec((err, books) => {
          if (err) {
            callback({ success: false, message: err.message });
          } else {
            callback({ success: true, books, numPages });
          }
        });
    }
  });
}

/**
 * Add hasRequested and isOwner properties to array of books
 * Returns object with succes, and either error or books
 * @param {array} books
 * @param {String} userId
 * @param {Function} callback
 */
function postProcessBooks(books, numPages, userId, callback) {
  Request.find({ requestingUser: userId }, (err, requests) => {
    if (err) {
      callback({ success: false, error: err.message });
    } else {
      const booksRequested = requests.map((request) => request.bookId);
      for (let i = 0; i < books.length; i += 1) {
        if (books[i].owner === userId) {
          books[i].isOwner = true;
          // books[i]._id is an object and request.bookId is a string
        } else if (booksRequested.includes(books[i]._id.toString())) {
          books[i].hasRequested = true;
        }
      }

      callback({ success: true, books, numPages });
    }
  });
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

apiRoutes.get('/myBooks', tokenVerify, (req, res) => {
  // Books per page
  let booksPerPage = BooksPerPage;
  if (req.query.booksPerPage) {
    booksPerPage = req.query.booksPerPage;
  }
  // Define filters
  const filterBy = { owner: req.query.userId };
  const sortBy = { 'googleData.title': 1 };

  getBooks(res, booksPerPage, filterBy, sortBy, req.query.activePage ? req.query.activePage : 0, (response) => {
    res.json(response);
  });
});

// Does not require authentication
apiRoutes.get('/allBooks', (req, res) => {
  // Books per page
  let booksPerPage = BooksPerPage;
  if (req.query.booksPerPage) {
    booksPerPage = req.query.booksPerPage;
  }
  // Define filters
  const sortBy = { 'googleData.title': 1 };

  getBooks(res, booksPerPage, {}, sortBy, req.query.activePage ? req.query.activePage : 0, (response) => {
    // If an error occured or the user is not authenticated
    if (!response.success || !req.query.userId || !req.query.token) {
      res.json(response);
    } else {
      // verify the credentials
      tokenVerify(req, res, () => {
        // Post proccess books to include isOwner and hasRequested
        postProcessBooks(response.books, response.numPages, req.query.userId, (resp) => {
          res.json(resp);
        });
      });
    }
  });
});

apiRoutes.post('/addBook', tokenVerify, (req, res) => {
  // Check required info is passed
  if (req.body.googleData) {
    const newBook = new Book();

    newBook.owner = req.body.userId;
    newBook.googleData = req.body.googleData;
    newBook.isOwner = false;
    newBook.hasRequested = false;
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
    Book.remove({ _id: req.body.bookId }, (err) => {
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
  if (req.body.bookId && req.body.bookOwner) {
    const newReq = new Request();

    newReq.requestingUser = req.body.userId;
    newReq.requestDate = Date.now();
    newReq.bookOwner = req.body.bookOwner;
    newReq.bookId = req.body.bookId;
    newReq.accepted = false;

    newReq.save((e) => {
      if (e) throw e;
      res.json({ success: true });
    });
  } else {
    res.json({ success: false, error: 'Book id or owner not provided.' });
  }
});

apiRoutes.post('/removeRequest', tokenVerify, (req, res) => {
  if (req.body.requestId) {
    Request.remove({ _id: req.body.requestId }, (err) => {
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

// TODO: Test
apiRoutes.post('/requests', tokenVerify, (req, res) => {
  // Get all requests where user is the book owner or the book owner has accepted the users request
  Request.find({ $or: [{ bookOwner: req.body.userId }, { requestingUser: req.body.userId, accepted: true }] }, (error, requests) => {
    if (error) {
      res.json({ success: false, error: error.message });
    } else {
      // Connect requests with user info, {name, country, city} if not accepted, {name, country, city, email} if accepted
      const otherUsers = requests.map((request) => (
        request.bookOwner === req.body.userId ? request.requestingUser : request.bookOwner
      ));
      User.find({ _id: { $in: otherUsers } }, '_id name country city email', (err, users) => {
        if (err) {
          res.json({ success: false, error: err.message });
        } else {
          // Combine requests with relevant user data
          let other;
          const returnData = requests.map((r) => {
            other = r.bookOwner === req.body.userId ? r.requestingUser : r.bookOwner;
            const concatRequest = Object.assign({}, r, users.find((u) => u._id === other));
            // email is only available if request has been accepted
            if (!r.accepted) {
              concatRequest.email = undefined;
            }
            return concatRequest;
          });
          res.json({ success: true, requests: returnData });
        }
      });
    }
  });
});

apiRoutes.post('/updateSettings', tokenVerify, (req, res) => {
  User.update({ _id: req.body.userId }, { $set: {
    name: req.body.name,
    country: req.body.country,
    city: req.body.city,
    zip: req.body.zip,
  } }, (err) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
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

apiRoutes.get('/deleteBooks', (req, res) => {
  Book.remove({}, (err) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

apiRoutes.get('/deleteAll', (req, res) => {
  User.remove({}, (err) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      Book.remove({}, (error) => {
        if (error) {
          res.json({ success: false, error: error.message });
        } else {
          Request.remove({}, (e) => {
            if (e) {
              res.json({ success: false, error: e.message });
            } else {
              res.json({ success: true });
            }
          });
        }
      });
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

apiRoutes.get('/deleteRequests', (req, res) => {
  Request.remove({}, (err) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

module.exports = apiRoutes;
