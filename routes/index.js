var express = require('express');
var controlador=require('../controller/login/index')
var midd = require('../controller/login/middlewar');
var seguridad = require('../controller/login/validacioncokie')






var router = express.Router();

/* GET home page. */

router.get('/',controlador.login);

router.post('/',midd.validar,controlador.verificar);

router.get('/a_y_r',seguridad.uyyy, function(req, res, next) {
  res.render('login/a_y_r');
})

router.get('/admin',controlador.crearcuenta1);

router.post('/admin',midd.Sanitisacionadmin,controlador.verificarCuenta);

router.get('/repartidor',seguridad.uyyy,controlador.crearcuenta2);

router.post('/repartidor',midd.sanitacionrepartidor,controlador.verificarCuenta);

router.get('/recuperar',seguridad.uyyy,controlador.recuperarContra);//ingresar correo


router.post('/recuperar_contra',midd.verificarcorreo,controlador.enviarCorreo);//introdudir codigo
router.get('/nuevacontra',seguridad.uyyy,function(req,res){
  res.render('login/nuevacontra');
 })
router.post('/codigo',controlador.confirmar);//cambiar contra si el codigo es valido



router.post('/update',midd.contraNueva,controlador.update);//actualizar contra

//router.post('/update',controlador.update);







router.get('/ventanaAdmin', function(req, res) {
  const token = req.cookies.perfil;
  
 
  res.render('login/ventanaAdmin',{imagen:token.imagen,nombre:token.nombre,marca:token.marca});
})

router.get('/clear',(req,res)=>{
  res.clearCookie('authToken');
  res.clearCookie('refreshToken');
  res.clearCookie('connect.sid');
  res.clearCookie('correo');
  res.redirect('/')
})







/*router.post('/', (req, res) => {
  const nombre = req.body.username;
  const contraseña = req.body.password;
  console.log(`Nombre: ${nombre}, Correo: ${contraseña}`);
});*/




module.exports = router;

 