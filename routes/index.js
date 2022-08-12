var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lego DB', data: [ { id: 1, name: "Red Brick", url: "https://static.turbosquid.com/Preview/2019/05/23__07_35_00/Lego_Brick_2x2_Bright_Red_thumbnail_Square_0000.jpg1B65A82A-AF38-438A-B488-761044B6A61FLarge.jpg" }, { id: 2, name: "Yellow Brick", url: "https://static.turbosquid.com/Preview/2019/05/23__07_35_00/Lego_Brick_2x2_Bright_Red_thumbnail_Square_0000.jpg1B65A82A-AF38-438A-B488-761044B6A61FLarge.jpg" }, { id: 3, name: "Green Brick", url: "https://static.turbosquid.com/Preview/2019/05/23__07_35_00/Lego_Brick_2x2_Bright_Red_thumbnail_Square_0000.jpg1B65A82A-AF38-438A-B488-761044B6A61FLarge.jpg" }, ] });
});

module.exports = router;
