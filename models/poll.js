// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user model
var pollSchema = new Schema( {
  user_id: String,
  poll_title: String,
  description: String
  // Include an array of poll option objects
}, { timestamps: true } );

var poll = this;

var ModelClass = mongoose.model('poll', pollSchema);
module.exports = ModelClass;
