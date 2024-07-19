
var email=require('../login/enviargmail');
var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
const jwt = require('jsonwebtoken');
const Gtoken = require('../Gtoken');

let r;

module.exports={

    login:function(req,res){
         res.render('login/inicio'); 
       
         //res.redirect('/admin');
        },
    verificar:function(req, res, next){
        const token = req.cookies.authToken;
        if (!token) {
            res.send(" no tienes token "); // Si no hay token, devuelve un error 401
        } else{
            try {
                const validarPayload=Gtoken.validarToken(token)
                console.log("tu token es ", validarPayload)
                res.send("bienvenido admin tu token es valido")
            } catch (error) {
                res.send("tu token no es valido")
                
            }
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
            const token = Gtoken.generarToken(payload);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true, // Cambia esto a true en producción con HTTPS
                maxAge: 3600000 // 1 hora
            });
            res.render('login/ventanaAdmin')

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



    
