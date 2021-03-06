var jwt = require('jsonwebtoken');
var secret = require('../config').secret
module.exports = {
  required: function (req, res, next) {
    var token = req.headers['x-access-token'] || req.query.token;
    if (token) {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'No token provided.',
      });
    }
  },
};
