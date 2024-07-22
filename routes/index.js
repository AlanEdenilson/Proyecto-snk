var express = require('express');
var controlador=require('../controller/login/index')
var midd = require('../controller/login/middlewar');






var router = express.Router();

/* GET home page. */

router.get('/',controlador.login);

router.post('/',midd.validar,controlador.verificar);

router.get('/a_y_r', function(req, res, next) {
  res.render('login/a_y_r');
})

router.get('/admin',controlador.crearcuenta1);

router.post('/admin',controlador.verificarCuenta);

router.get('/repartidor',controlador.crearcuenta2);

router.post('/repartidor', controlador.verificarCuenta);

router.get('/recuperar',controlador.recuperarContra);

router.post('/recuperar_contra', controlador.enviarCorreo);

router.post('/codigo',controlador.confirmar)


/*router.post('/', (req, res) => {
  const nombre = req.body.username;
  const contraseña = req.body.password;
  console.log(`Nombre: ${nombre}, Correo: ${contraseña}`);
});*/




module.exports = router;

 