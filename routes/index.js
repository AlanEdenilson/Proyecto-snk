var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/inicio ');
});

router.get('/piola', function(req, res, next) {
  res.render('login/index');
});

module.exports = router;

 