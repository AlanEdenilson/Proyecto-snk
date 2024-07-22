
var email=require('../login/enviargmail');

var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')

const Gtoken = require('../Gtoken');
const model = require('../../model');


let r;
function validarTokenPromesa(token) {
   
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
}


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
        validarTokenPromesa(res,token)
        


       async  function p() {
        var username=req.body.username;
        var password=req.body.password;
        // buscando usuario en la bd
        var respuestabd= await model.buscarusuario(conexion,username,password)
        //---------------------------------------------------------------------
        // verificando si no existe 
        if (respuestabd === false) {res.send("usuario o conraseña incorrecta")} 
        // ____________________________________________________________________
        console.log("tu respuesta de la bd es  ; " + respuestabd)

        // verificando si el token es valido
        var vertoken= await validarTokenPromesa(token) 
        console.log("tu vertoken es ; " + vertoken.rol,":",vertoken.t)
        //---------------------------------------------------------------------

        // si el token es valido y el usuario es correcto, muestra la ventana correspondiente
        if (vertoken.t === true && respuestabd === true)  {
            if(vertoken.rol==="1"){
                res.render('login/ventanaAdmin');
            }else if(vertoken.rol==="2"){
                res.render('login/ventanaRpartidor');
            }
        } else if (vertoken.t===false && respuestabd === true) {
            res.send("no tines token por favor crea uno ")
            //refresh de token 
        }else if(vertoken.t==="alter" && respuestabd === true){
            res.send("tu token a sido alterado, por favor contactanos")
        }
        
        }

        p();


       



        /*model.buscarusuario(conexion,username,password)
        .then(result => {
            if (result) {
                console.log("Usuario encontrado:", result);
            } else {
                res.send("No se encontró ningún usuario con el nombre o correo especificado.");
            }
            })
            .catch(error => {
                console.error("Error ejecutando la consulta:", error);
            });*/


        //extraendo la cookie
       /* const token = req.cookies.authToken;

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
        }*/
             
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
    },
        // aroon perez
    
}//nolll
    //-----------------------------------------|

    //-----------------------------------------|
    //-----------------------------------------|


    //funciones que no se exportan 

   
       
    
    //-----------------------------------------|

    //-----------------------------------------|
   



    
