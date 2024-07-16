var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/a_y_r ');
});

router.get('/piola', function(req, res, next) {
  res.render('login/gmail');
});


module.exports = router;

 