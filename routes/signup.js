var express = require('express');
var router = express.Router();
var FlakeIdGen = require('flake-idgen')
var intformat = require('biguint-format')
var generator = new FlakeIdGen;
var users = require('../services/users.js');

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Lego DB' });
});

router.post('/', async function(req, res, next) {
 try {
   var id = intformat(generator.next(), 'dec');
   var username = req.body.username;
   var email = req.body.email;
   var password = req.body.password;

   await users.create(id, username, email, password)
   res.redirect('http://localhost:3000')
 } catch(err) {
   console.error("Error while creating new user ", err.message);
   next(err);
 }
});

module.exports = router;
