// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user model
var userSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, lowercase: true },
  password: String
}, { timestamps: true });

// Create and export user model
var ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;