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


router.post('/add',upload.single('imagen'),controlador.addproductos);





//router.post("/addproductos",filtro.addproductos,controlador.rrr)




module.exports = router;