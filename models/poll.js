// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user model
var pollSchema = new Schema({
  option: { type: String, unique: true },
  owner: { type: String, unique: true },
  title: { type: String },
  tally: { type: Number }
}, { timestamps: true });

var ModelClass = mongoose.model('poll', pollSchema);
module.exports = ModelClass;