var express = require('express');
var router = express.Router();
var FlakeIdGen = require('flake-idgen')
var intformat = require('biguint-format')
var generator = new FlakeIdGen;
var users = require('../services/users.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Lego DB' });
});

router.post('/', async function(req, res, next) {
 try {
   var id = intformat(generator.next(), 'dec');
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;

   var salt = bcrypt.genSaltSync(10);
   var hash = bcrypt.hashSync(password, salt);
   var emailData = users.getEmailData(email);
   var userData = users.getData(username);

   await users.create(id, username, email, hash)
   res.redirect('http://localhost:3000?message=Signup%20successful%20you%20can%20login%20into%20your%20account.')
 } catch(err) {
   console.error("Error while creating new user ", err.message);
   next(err);
 }
});

module.exports = router;
