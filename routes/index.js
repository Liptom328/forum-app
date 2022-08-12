var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lego DB', data: [ { id: 1, name: "Red Brick", url: "https://www.turbosquid.com/pl/3d-models/3d-model-lego-brick-2x2-bright-1409481" }, { id: 2, name: "Yellow Brick", url: "https://www.turbosquid.com/pl/3d-models/3d-model-lego-brick-2x2-bright-1409481" }, { id: 3, name: "Green Brick", url: "https://www.turbosquid.com/pl/3d-models/3d-model-lego-brick-2x2-bright-1409481" }, ] });
});

module.exports = router;
