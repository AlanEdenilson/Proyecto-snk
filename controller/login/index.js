module.exports={

    login:function(req,res){
         res.render('login/inicio');   
         //res.redirect('/admin');
        },
    verificar:function(req, res, next){
        console.log(req.body);

    },
    crearcuenta1:function(req, res){
        res.render('login/admin');
    },
    verificarCuenta:function(req, res){
        
        if (req.body.rol === "1") {
            console.log("bienvenido administrador tus datos son");
            console.log(req.body);
        } if (req.body.rol==="2") {
            console.log("bienvenido repartidor tus datos son");
            console.log(req.body);
        } else {
            
        }
    },
    crearcuenta2:function(req, res){
        res.render('login/repartidor');
    },

    recuperarContra:function(req, res){
        res.render('login/recuperar_contraseña');
    }

    
}