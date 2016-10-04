var jwt = require('jsonwebtoken');
var secret = require('../config').secret
module.exports = {
  issueToken: function (user) {
    return jwt.sign({ sub: user.email}, secret);
  },
};
