var express = require('express');
var router = express.Router();
var controlller = require('../controller/aaron/index')

/* GET users listing. */
router.get('/l2', function(req, res, next) {
  res.render('repartidor/ventas_repartidor')
});

router.get('/vermarcas',controlller.vermarca)

router.get('/verpedido',controlller.verpedido)

module.exports = router;
