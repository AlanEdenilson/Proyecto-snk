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

router.post('/admin',midd.Sanitisacionadmin,controlador.verificarCuenta);

router.get('/repartidor',controlador.crearcuenta2);

router.post('/repartidor',midd.sanitacionrepartidor,controlador.verificarCuenta);

router.get('/recuperar',controlador.recuperarContra);//ingresar correo


router.post('/recuperar_contra',midd.verificarcorreo,controlador.enviarCorreo);//introdudir codigo
router.get('/nuevacontra',function(req,res){
  res.render('login/nuevacontra');
 })

router.post('/codigo',controlador.confirmar);//cambiar contra si el codigo es valido



router.post('/update',controlador.update);//actualizar contra

//router.post('/update',controlador.update);



router.get('/marca',controlador.enviarm);



router.get('/ventanaAdmin', function(req, res, next) {
  res.render('login/ventanaAdmin');
})

router.get('/clear',(res,req)=>{
  res.clearCookie('authToken');
  res.clearCookie('refreshToken');
  res.send('Sesión cerrada exitosamente');
})







/*router.post('/', (req, res) => {
  const nombre = req.body.username;
  const contraseña = req.body.password;
  console.log(`Nombre: ${nombre}, Correo: ${contraseña}`);
});*/




module.exports = router;

 