
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
     //-----------------------------------------|

    //-----------------------------------------|
    verificar:function(req, res, next){

        //extraendo la cookie
        const token = req.cookies.authToken;

        //verificando si no hay cokkie
        if (!token) {
            res.send(" no tienes token "); // Si no hay token, devuelve un error 401
        } else{
            //verificando si el token es valido
            try {
                const validarPayload=Gtoken.validarToken(token)
                console.log("tu token es ", validarPayload)
                res.send("bienvenido admin tu token es valido")
                // si hay pero no es valido 
            } catch (error) {
                res.send("tu token no es valido")
                
            }
        }
             
    },
    crearcuenta1:function(req, res){
        res.render('login/admin');
    },
    //-----------------------------------------|

    //-----------------------------------------|
    verificarCuenta:function(req, res){ 

        //crenado los datos a almacenar en la cokkie 

        const payload = {
            rol:req.body.rol,
            nombre:req.body.fullname,
            email:req.body.email,
            password:req.body.password
        }
        // generarando token y almacenando lo en la cokkie
        const token = Gtoken.generarToken(payload);
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true, // Cambia esto a true en producción con HTTPS
            maxAge: 3600000 // 1 hora
        });

        if (req.body.rol==="1") {
            res.render('login/ventanaAdmin');
        }
        else if (req.body.rol==="2") {
            res.render('login/ventanaRpartidor');
        }
    },

    //-----------------------------------------|
    crearcuenta2:function(req, res){
        res.render('login/repartidor');
    },                                        

    //-----------------------------------------|

    //-----------------------------------------|

    recuperarContra:function(req, res){
        res.render('login/recuperar_contraseña');
    },
    //-----------------------------------------|

     // funcion para mandar corrreo y codigo generado 

    //-----------------------------------------|
    enviarCorreo:function(req, res){
        r = random.generarcodigo(5);
        var correo = req.body.email;
        email.enviaremail(correo,r);
        
        console.log("codigo aleatorio: ",r)
        console.log("tu correo es ",correo);
        console.log("codigo aleatorio: ", r)

        //mandarlo ala pagina para recibir el codigo

        res.render('login/codigo')

        
    },
    //-----------------------------------------|

    //-----------------------------------------|
    confirmar:function(req, res){

        if (req.body.codigo===r) {
            res.render("login/nuevacontra");
        }else{
            res.send("codigo invalido");
        }
        }
    }
    //-----------------------------------------|


    //funciones que no se exportan 

   
       
    
    //-----------------------------------------|

    //-----------------------------------------|
   



    
