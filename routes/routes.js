
module.exports = function (router) {
  require('./users')(router);
  require('./books')(router);
};
