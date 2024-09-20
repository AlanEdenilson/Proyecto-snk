var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/l2', function(req, res, next) {
  res.render('repartidor/ventas_repartidor')
});

module.exports = router;
