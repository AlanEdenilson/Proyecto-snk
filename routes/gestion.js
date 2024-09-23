var express = require('express');
var router = express.Router();

var controller = require('../controller/GestiondPedido/index');


router.get('/',(req,res)=>{
    res.render('gestionDpedido/diseño2');
});

router.get('/l1',(req,res)=>{
    res.render('gestionDpedido/estado');

})

router.get('/l2',(req,res)=>{
    res.render('gestionDpedido/productos');

})

router.get('/l3',(req,res)=>{
    res.render('gestionDpedido/Gestinarp');

})

router.get('/pagina1',(req,res)=>{
    res.render('gestionDpedido/pagina1');

})

router.get('/verpedidos',controller.verpedidos)


router.get('/detalles',controller.detalles)


// rutas para la pagina de gestion de pedidos
router.get('/vernuevosregistros',controller.vernuevosregistros)




router.get('/l66', function(req, res, next) {
    res.render('repartidor/ventas_repartido')
  });
router.get('/89', function(req, res, next) {
    res.render('gestionDpedido/diseño1')
  });

  //aplication change
  router.post('/AplicationChange',controller.AplicationChange)
  
module.exports = router;

