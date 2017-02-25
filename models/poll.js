// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user model
var pollSchema = new Schema( {
  title: { type: String },
  option: { type: String, unique: true },
  owner: { type: String, unique: true },
  tally: { type: Number }
}, { timestamps: true } );

var ModelClass = mongoose.model('poll', pollSchema);
module.exports = ModelClass;