Book = require('../models/book');

module.exports = function () {

  function post(req, res) {
    Book.create(req.body, function (err, book) {
      if (err && err.name == 'ValidationError') {
        var errObj = {};
        for (var key in err.errors) {
          errObj[key] = err.errors[key].message;
        }

        res.status(422).json(errObj);
      } else if (book) {
        console.log(req.decoded);
        res.status(201).json({ info: book });
      }

    });
  }

  return {
    post: post,
  };
};
