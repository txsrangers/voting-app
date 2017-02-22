var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var Authentication = require('../controllers/authentication');
var passportService = require('../services/passport');
var passport = require('passport');

var User = require('../models/user')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
	res.render('allpolls', { title: 'List Of All Polls' });
});

router.get('/mypolls', function(req, res, next) {
	res.render('mypolls', { title: 'My Polls' });
});

router.get('/individualpoll', function(req, res, next) {
	res.render('individualpoll', { title: 'Poll' });
});

router.get('/createnewpoll', function(req, res, next) {
	res.render('createnewpoll', { title: 'Create New Poll' });
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
