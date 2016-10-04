bookController = require('../controllers/books')();
jwtAuthentication = require('../utilities/jwt');
User = require('../models/user');
module.exports = function (router) {
  function adminOnly (req, res, next) {
    var email = req.decoded.sub;
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        res.status(500).json({ info: err });
      } else if (user) {
        if (user.userType != 'admin') {
          return res.status(403).json({ info: 'You are not permitted to carry out the action' });
        }
        req.user = user;
        next();
      }
    });
  }

router.use('/books', jwtAuthentication.required, adminOnly);

router.route('/books')
  .post(bookController.post);
};
