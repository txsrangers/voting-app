const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');

// First, make a config object telling passport to use email/password combo
const localOptions = { usernameField: 'email' };

// create new instance of local strategy with our optoins
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  // look up user by email in database
  User.findOne({ email: email }, function(err, user) {
    // if internal error or no user found, return error
    if (err) { return done(err); }
    if (!user) { return done(null, false); }


    // if we find a user, call mongoose instance method to check password
    user.comparePassword(password, function(err, isMatch) {
      // if internal error or not a match, return an error
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      // otherwise, return the user object
      return done(null, user);
    });
  });
});

// Tell passport to serialize the user for sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// and to deserialize the user as well!
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// tell passport to use our local strategy
passport.use(localLogin);
