var express = require('express');
var router = express.Router();

var controller = require('../controller/GestiondPedido/index');


router.get('/',(req,res)=>{
    res.render('gestionDpedido/diseño2');
});

router.get('/l1',(req,res)=>{
    console.log(req.query.id)
    res.render('gestionDpedido/estado',{id:req.query.id});

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


router.get('/perfil',(req,res)=>{
    res.render('gestionDpedido/perfil')
})




router.get('/l66', function(req, res, next) {
    res.render('repartidor/ventas_repartido')
  });
router.get('/89', function(req, res, next) {
    res.render('gestionDpedido/diseño1')
  });

  //aplication change
  router.post('/AplicationChange',controller.AplicationChange)

  router.get('/repartidores',controller.verRepart)

  router.get('/decidir',(req,res)=>{
    res.render('gestionDpedido/decidir')
    })

    router.get('/menu',(req,res)=>{
        res.render('gestionDpedido/menuGestion')
        })

            router.get('/menus',(req,res)=>{
            if(req.query.n===1 || req.query.n==='1'){
                res.render('gestionDpedido/menu1')
            }
            if(req.query.n===2 || req.query.n==='2'){
                res.render('gestionDpedido/menu2')
            }
            if(req.query.n===3 || req.query.n==='3'){
                res.render('gestionDpedido/menu3')
            }
            if(req.query.n===4 || req.query.n==='4'){
                res.render('gestionDpedido/menu4')
            }
                })
                
    router.get('/datos/:id',controller.cargarcontenido)
    
    router.get('/datos2',controller.cargarcontenido2)

    router.get('/pedidosProcess',controller.pedidosEnprocesos)

    router.get('/detall',(req,res)=>{
        res.render('menusdiseños/Dmenu3')
    })

    router.get('/detall1',(req,res)=>{
        res.render('menusdiseños/Dmenu1')
    })

    router.get('/cancelados',controller.rechazados)

    router.delete('/borar',controller.borar)


        
      
    
  
module.exports = router;

