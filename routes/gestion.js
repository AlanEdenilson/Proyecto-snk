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

module.exports = router;