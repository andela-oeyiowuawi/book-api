var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var allowedRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var stringLengthChecker = [strVal, 'Name must be between 1 and 14 characters'];

var passwordlength = [paswVal, 'Name must be between 1 and 14 characters'];
var userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    validate: stringLengthChecker,
  },

  lastname: {
    type: String,
    required: true,
    validate: stringLengthChecker,
  },
  password: {
    type: String,
    required: true,
    validate: passwordlength,
  },
  email: {
    type: String,
    required: true,
    match: allowedRegex,
    index: { unique: true },
  },
  userType: {
    type: String,
    default: 'normal',
  },
});

function strVal(str) {
  return str.length > 0 && str.length <= 14;
}

function paswVal(str) {
  return str.length > 7;
}

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password);
  next();
});

module.exports = mongoose.model('User', userSchema);
