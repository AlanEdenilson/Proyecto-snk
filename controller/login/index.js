
var email=require('../login/enviargmail');
var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
const Gtoken = require('../Gtoken');
const model = require('../../model');
const aux=require('../login/auxiliar')



let r;
/*function validarTokenPromesa(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            resolve({t:false});
            console.log("tu token no es valido")
        } else {
            try {
                const validarPayload = Gtoken.validarToken(token);
                console.log("tu token es ", validarPayload);
                const  t = true;
                const rol = validarPayload.rol;
                
                resolve({rol,t});

            } catch (error) {
                
                
                

                
            }
        }
       
    });
}*/


module.exports={

    login:function(req,res){
    
        res.render('login/inicio');
        
        /*
        var validarPayload;
        const token = req.cookies.authToken;
        if (!token) {
            res.render('login/inicio'); // Si no hay token, devuelve un error 401
        } else{
            //verificando si el token es valido
            try {
                validarPayload=Gtoken.validarToken(token)
                console.log("tu token es ", validarPayload)
                if (validarPayload.rol==="1") {
                    res.send("tu token es valido tienes los privilegios de un admin")
                   // res.render('login/ventanaAdmin');
                }else if(validarPayload.rol==="2"){
                    res.send("tu token es valido tienes los privilegios de un repartidor")
                   // res.render('login/ventanaRpartidor');
                }
                // si hay pero no es valido 
            } catch (error) {
                res.send("tu token no es valido")
                
            }
        }*/
          
        // const respuesta = model.buscarusuario(conexion)
         //console.log(respuesta)
         
       
         //res.redirect('/admin');
        },
     //-----------------------------------------|

    //-----------------------------------------|
    verificar:function(req, res, next){
        const token = req.cookies.authToken;
        //validarTokenPromesa(res,token)
       async  function p() {
        var username=req.body.username; 
        var password=req.body.password;
        // buscando usuario en la bd
        try {
            var respuestabd= await model.buscarusuario(conexion,username,password)
            console.log("tu respuesta de la bd es  ; " + respuestabd)
        } catch (error) {
            console.error('Error al buscar usuario:', error.message);
            res.render('login/inicio',{errors:"usuario o contraseña no valido por ⬇ favor  crea una cuenta "});
        };
        // verificando si el token es valido 
        try {
            var vertoken= await Gtoken.validarToken2(token)
            console.log('Token is valid:',vertoken);
            var Rol =req.body.rol;
            aux.mostrarventanas(res,vertoken,respuestabd,Rol);
        } catch (error) {
            console.error('Token validation error:', error.message);
            res.send("crea un token de nuevo ")
        }
        //---------------------------------------------------------------------
     /*  if (vertoken.t===false && respuestabd === true) {
            res.send("no tines token por favor crea uno ")
            //refresh de token 
        }else if(vertoken.t==="alter" && respuestabd === true){
            res.send("tu token a sido alterado, por favor contactanos")
        }*/
        
        }

        p();
             
    },
    crearcuenta1:function(req, res){
        res.render('login/admin');
    },
    //-----------------------------------------|

    //-----------------------------------------|
    verificarCuenta:function(req, res){ 
        var datos = req.body;
        console.log(datos);


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

        

        model.insertarUsuario(conexion,datos)
         .then(() => {
            console.log("usuario ingresado"); // Esto se ejecuta si la promesa se resuelve
          })
          .catch((error) => {
            console.error(error); // Esto se ejecuta si la promesa se rechaza
          });

        /*if (req.body.rol==="1") {
            res.render('login/ventanaAdmin');
        }
        else if (req.body.rol==="2") {
            res.render('login/ventanaRpartidor');
        }*/

        aux.mostrarVentanas2(res,req.body.rol)

        
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
    },
        // aroon perez
    enviarm:function(req, res){
        res.render("login/marca");
    },
    verificard:function(req, res){
        
    },

    findUser: async function (user) {
        try {
          return await model.FindUser(conexion, user);
        } catch (error) {
            console.error('usuario no encontrado');
        }
      }
}//nolll
    //-----------------------------------------|

    //-----------------------------------------|
    //-----------------------------------------|


    //funciones que no se exportan 

   
       
    
    //-----------------------------------------|

    //-----------------------------------------|
   



    
