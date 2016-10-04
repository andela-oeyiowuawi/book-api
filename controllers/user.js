var User = require('../models/user');
var util = require('../utilities/login');
module.exports = function () {
  var post = function (req, res) {
    var email = req.body.email;
    var newUser = req.body;
    User.create(newUser, function (err, user) {
      if (err) {
        if (err.name == 'ValidationError') {
          var errObj = {};
          for (var key in err.errors) {
            errObj[key] = err.errors[key].message;
          }

          res.status(422).json({ booo: errObj });
        } else if (err.code) {
          res.status(422).json({ info: 'Email already taken' });
        } else {
          res.status(500).json({ info: err });
        }
      } else {
        res.status(201).json({ info: 'user created',token: util.issueToken(user), data: user });
      }
    });
  };

  var login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (!user) {
        res.status(404).json({ info: 'No User by that email' });
      } else {
        if (user.password == bcrypt.compareSync(password, user.password))
          res.status(200).json({ token: util.issueToken(user) });
        else {
          res.status(401).json({ info: 'invalid username or password' });
        }
      }
    });
  };

  return {
    post: post,
    login: login,
  };
};
