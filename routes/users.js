userController = require('../controllers/user')();
module.exports = function (router) {
  router.route('/users')
    .post(userController.post);
  router.route('/users/login')
    .post(userController.login);
  return router;
};
