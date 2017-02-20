var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET home page. */
var User = require('../models/user')

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('voting');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Add New User' });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

/* POST to Add User Service */
router.post('/signup', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('voting');
    
    // Submit to the DB
    console.log("userName: " + userName);
    console.log("userEmail: " + userEmail);
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/userlist");
        }
    });
    
});

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

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
//Create new account
router.post('/userlist', function(req, res, next) {
	//get values from request body (comes from signup form)
	var email = req.body.email;
	var password = req.body.password;

	//canot proceed if no values
	if(!email || !password) {
		return res.status(422).send({error: 'You must provide email and password!'});
	}

	//check for existing user email in database
	User.findOne({ email: email }, function (err, existingUser) {
		//always handle possible errors
		if(err) { return next(err); }
		//if a record is found, display error
		if(existingUser) {
			return res.status(422).send({ error: 'Email is in use' })
		}

		//if no record found, define new user instance
		var user = new User({
			email: email,
			password: password
		});

		//save to database
		user.save(function(err) {
			//handle error
			if(err) { return next(err); }
			//respond with user object
			res.json({ success: true, user: user})
		});
	});
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