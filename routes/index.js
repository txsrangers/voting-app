var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Authentication = require('../controllers/authentication');
require('../services/passport');
var passport = require('passport');

//import the models
var User = require('../models/user')
var Poll = require('../models/poll') // Keep it singular

// Function to pass for protected routes
function ensuredAuthenticated(req, res, next) {
  // If the user is logged in, proceed to the next step in route
  if (req.isAuthenticated()) {
    return next();
  }
  // if not, redirect to createnewpoll view
  res.render('index', { title: 'Voting App' });
}

/* GET Userlist page. */
router.get('/userlist', function(req, res, next) {
  User.find({}, function(err, userlist) {
    if (err) return next(err);
    res.render('userlist', {userlist: userlist});
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Voting App' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/signup', function(req, res, next) {
	res.render('signup', { title: 'Signup' });
});

router.post('/signup', Authentication.signup);

router.get('/allpolls', function(req, res, next) {
  Poll.find({}, function(err, polls) {
    if (err) return next(err);
    res.render('allpolls', {polls: polls});
  });
});

router.get('/mypolls', function(req, res, next) {
	Poll.find({}, function(err, polls) {
    if (err) return next(err);
    res.render('mypolls', {polls: polls});
  });
});

router.get('/individualpoll', function(req, res, next) {
	res.render('individualpoll', { title: 'Poll' });
});

router.get('/createnewpoll', ensuredAuthenticated, function(req, res, next) {
	res.render('createnewpoll', { title: 'Create New Poll' });
});

// To post a new poll to the database. Proctect routed. See line 12 above
router.post('/createnewpoll', ensuredAuthenticated, function(req, res, next) {
  // get values from input form and passport
  var poll_title = req.body.title;
  var description = req.body.description;
  var user_id = req.user._id;

  // check for empty string data
  if (!poll_title.length || !description.length) return res.status(422).send('Fields cannot be blank!');

  // create a new instance of Poll model
  var poll = new Poll({
    user_id: user_id,
    description: description,
    poll_title: poll_title
  });

  // save the new instance to db
  poll.save(function(err) {
    // hanld possible errors
    if (err) return next(err);
    res.location('/');
    res.redirect('/');
  });
});

router.get('/editpoll', function(req, res, next) {
	res.render('editpoll', { title: 'Edit Poll' });
});

router.get('/deletepoll', function(req, res, next) {
	res.render('deletepoll', { title: 'Delete Poll' });
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});


module.exports = router;


/*

Home page route - GET

 SIGNUP - GET
 SIGNUP - POST
 SIGNIN - GET
 SIGNIN - POST

 LIST OF ALL POLLS - GET
 LIST OF MY POLLS - GET
 INDIVIDUAL POLL - GET
 INDIVIDUAL POLL - POST
 CREATE NEW POLL - GET
 CREATE NEW POLL - POST
 EDIT POLL - GET
 EDIT POLL - PUT/PATCH
 EDIT POLL (ADD NEW OPTION) - PUT/PATCH
 DELETE POLL - DELETE

 */
