// Model filenames are conventionally singular
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our user model
var pollSchema = new Schema({
  option: { type: String, unique: true },
  owner: { type: String, unique: true },
  title: { type: String }
}, { timestamps: true });

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