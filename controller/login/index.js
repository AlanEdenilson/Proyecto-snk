
var email=require('../login/enviargmail');
var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
var gtoken=require('../Gtoken')
;
let r;

module.exports={

    login:function(req,res){
         res.render('login/inicio'); 
       
         //res.redirect('/admin');
        },
    verificar:function(req, res, next){
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        else{
             res.json(token);
        }
    },
    crearcuenta1:function(req, res){
        res.render('login/admin');
    },
    verificarCuenta:function(req, res){ 

        if (req.body.rol === "1") {
            console.log(req.body);
            const payload = {
                rol:req.body.rol,
                nombre:req.body.fullname,
                email:req.body.email,
                password:req.body.password
            }
            const token = gtoken.generarToken(payload);
            res.cookie('token', token);
            res.json({ token });

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
        r = random.generarcodigo(5);
        var correo = req.body.email;
        email.enviaremail(correo,r);
        
        console.log("codigo aleatorio: ",r)
        console.log("tu correo es ",correo);
        console.log("codigo aleatorio: ", r)

        res.render('login/codigo')

        
    },
    confirmar:function(req, res){

        if (req.body.codigo===r) {
            res.render("login/nuevacontra");
        }else{
            res.send("codigo invalido");
        }
        }
        

    }



    
