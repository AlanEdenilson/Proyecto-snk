var express = require('express');
var router = express.Router();
//var filtro=require('../controller/admin/middlewar')
//var controlador=require('../controller/admin/index')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hola admin');
});



1 


//router.post("/addproductos",filtro.addproductos,controlador.rrr)




module.exports = router;