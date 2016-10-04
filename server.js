var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var db = mongoose.connect(config.database);
var morgan = require('morgan');
var port = config.PORT;
require('./routes/routes')(router);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('hello world');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', router);
app.listen(port, function () {
  console.log('app running on ' + port);
});
