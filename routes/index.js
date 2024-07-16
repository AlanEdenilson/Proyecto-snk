var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/a_y_r');
});

router.get('/piola', function(req, res, next) {
  res.render('login/gmail');
});

router.get('/admin', function(req, res, next) {
  res.render('login/admin');
});

router.get('/inicioo', function(req, res, next) {
  res.render('login/inicio');
});

router.get('repar', function(req, res, next) {
  res.render('login/repar');
})



module.exports = router;

 