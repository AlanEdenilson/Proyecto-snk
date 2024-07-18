var random = require('../login/generarcodigo')

let r;

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
    },
    enviarCorreo:function(req, res){
    
        r= random.generarcodigo(5);
        console.log("codigo aleatorio: ",r)
        console.log(req.body);
        res.render('login/codigo')

        
    },
    confirmar:function(req, res){
        console.log("funciona",req.body);
        console.log(r);

        if ( req.body.codigo === r) {
            res.render('login/nuevacontra');
        } else {
            res.send("codigo incorrecto");
        }
            
    },

}

    

    
