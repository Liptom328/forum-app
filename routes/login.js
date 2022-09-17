var express = require('express');
var router = express.Router();
var users = require('../services/users.js');
var bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Lego DB' });
});

router.post('/', async function(req, res, next) {
 try {
   var username = req.body.username;
   var password = req.body.password;
   var userData = await users.getData(username)
   if (userData !== undefined) {
      bcrypt.compare(password, userData['password'], function(err, result) {
        if (result === true) {
          var session = req.session;
          session.userid = userData['id'];
          session.email = userData['email'];
          session.user = username;
          session.pass = password;
          res.redirect('http://localhost:3000?success=true')
        } else {
          res.redirect('http://localhost:3000/login?err=Invalid%20login%20data.')
        }
      });
   } else {
      res.redirect('http://localhost:3000/login?err=User%20with%20this%20name%20doesnt%20exist.')
   }
   
 } catch(err) {
   console.error("Error while logging in ", err.message);
   next(err);
 }
});

module.exports = router;