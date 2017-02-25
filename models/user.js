// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// Define our user model
var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  polls: String
}, { timestamps: true });

// We don't want to save unhashed password in the database!
// Before each account creation, hash the password using a pre hook
// http://mongoosejs.com/docs/middleware.html
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});

// This is a Mongoose method we have created.
// We cannot unhash/decrypt passwords, so when a user attempts to sign in,
// hash the password from sign in form and compare to hashed pw in database
// http://mongoosejs.com/docs/guide.html
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}


// Create and export user model
var ModelClass = mongoose.model('user', userSchema);
module.exports = ModelClass;
