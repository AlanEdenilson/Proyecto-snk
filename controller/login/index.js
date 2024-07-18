module.exports={

    login:function(req,res){
         res.render('login/inicio');   
         //res.redirect('/admin');
        },
    verificar:function(req, res, next){
        console.log(req.body);
    }
    
}