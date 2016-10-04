var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Book', bookSchema);
