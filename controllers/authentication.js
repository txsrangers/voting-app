const User = require('../models/user');

exports.signup = function(req, res, next) {
  // get the values from the signup form
  const email = req.body.email;
  const password = req.body.password;

  // if email or password are blank, respond with error
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // look up the user email in the database
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if it already exists, respond with an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // create an instance of User model
    const user = new User({
      email: email,
      password: password
    });

    // save the new user instance to the database
    user.save(function(err) {
      if (err) { return next(err); }

      // automatically log in user after account creation
      req.login(user, function(err) {
        if (err) return next(err);
        return res.redirect('/');
      });
    });
  });
}
