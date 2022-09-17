var express = require('express');
var router = express.Router();

router.get('/data', function(req, res, next) {
  if (req.session.user !== undefined || req.session.pass !== undefined || req.session.id !== undefined || req.session.email !== undefined) {
    res.json({ message: "OK", id: req.session.userid, username: req.session.user, email: req.session.email, password: req.session.pass });
  } else {
    res.json({ message: "User is not logged in." });
  }
});

module.exports = router;
