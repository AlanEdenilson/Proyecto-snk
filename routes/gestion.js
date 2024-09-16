var express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    res.render('gestionDpedido/diseño2');
});


module.exports = router;