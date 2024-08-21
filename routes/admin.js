var express = require('express');
var router = express.Router();
var upload=require('../controller/admin/cargarimagenes')
var controlador=require('../controller/admin/index')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('hola admin');
});

router.get('/marca',(req,res)=>{
  res.render("login/marca")
});

router.post('/marca',upload.single('imagen'),controlador.marca)

router.get('/id',(req,res)=>{
  res.render('admin/id')
})

router.get('/uploads',controlador.updt)


router.post('/add',upload.single('archivo'),controlador.addproductos);

router.get('/te53eer353r',controlador.mostar)

router.delete('/delete/:id',controlador.delete)

router.patch('/update1/:id',controlador.actualizar)
router.patch('/update2/:id',upload.single('imagen'),controlador.actualizar2)






//router.post("/addproductos",filtro.addproductos,controlador.rrr)




module.exports = router;