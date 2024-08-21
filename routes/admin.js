var express = require('express');
var router = express.Router();
var upload=require('../controller/admin/cargarimagenes')
var controlador=require('../controller/admin/index')
var seguridad = require('../controller/login/validacioncokie')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hola admin');
});

router.get('/marca',seguridad.uyyy,(req,res)=>{
  res.render("login/marca")
});

router.post('/marca',upload.single('imagen'),controlador.marca)

router.get('/id',seguridad.uyyy,(req,res)=>{
  res.render('admin/id')
})

router.get('/uploads',seguridad.uyyy,controlador.updt)


router.post('/add',upload.single('archivo'),controlador.addproductos);

router.get('/te53eer353r',seguridad.uyyy,controlador.mostar)

router.delete('/delete/:id',controlador.delete)

router.patch('/update1/:id',(req,res)=>{
  const userId = req.params.id;
 
  console.log('#'+userId)
  console.log(req.body)

})
router.patch('/update2/:id',upload.single('archivo'),(req,res)=>{


  const userId = req.params.id;
  const imagen= req.file
  const updatedData = JSON.stringify(req.body);

  if(updatedData === '{}'){
    console.log('no se an proporcinado cmabio solo imagen')
    console.log(imagen)
   

  }else{
  console.log(userId)
  console.log(imagen)
  console.log(updatedData)
  }
  
})






//router.post("/addproductos",filtro.addproductos,controlador.rrr)




module.exports = router;