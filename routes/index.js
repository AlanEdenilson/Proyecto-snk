var express = require('express');
var controlador=require('../controller/login/index')
const { default: nodemon } = require('nodemon');
var router = express.Router();

/* GET home page. */

router.get('/',controlador.login);

router.post('/',controlador.verificar);

router.get('/piola', function(req, res, next) {
  res.render('login/gmail');
});

router.get('/admin', function(req, res, next) {
  res.render('login/admin');
});

router.get('/a_y_r', function(req, res, next) {
  res.render('login/a_y_r');
})

router.get('/repartidor', function(req, res, next) {
  res.render('login/repartidor');
})

/*router.post('/', (req, res) => {
  const nombre = req.body.username;
  const contraseña = req.body.password;
  console.log(`Nombre: ${nombre}, Correo: ${contraseña}`);
});*/




module.exports = router;

 