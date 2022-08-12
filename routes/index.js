var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lego DB', data: [ { id: 1, name: "Red Brick" }, { id: 2, name: "Yellow Brick" }, { id: 3, name: "Green Brick" }, ] });
});

module.exports = router;
