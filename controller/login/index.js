
var email=require('../login/enviargmail');
var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
const Gtoken = require('../login/Gtoken');
const model = require('../../model');
const aux=require('../login/auxiliar');
const generarcodigo = require('../login/generarcodigo');



let r;



module.exports={

    login:function(req,res){

        const token = req.cookies.authToken;

     async function verificartoken() {     
        try {
            var vtoken= await Gtoken.validarToken2(token)
            console.log('Token is valid:',vtoken);
            var rol = vtoken.rol;
            aux.mostrarVentanas2(res,rol);
        } catch (error) {
            console.error('Token validation error:', error.message);
            if (error.message === 'Token has expired.') {
                const refreshToken = req.cookies.refreshToken;
    
                try {
                    const decoded = await Gtoken.validarRefreshToken(refreshToken);
                  const { rol, email } = decoded;
                    console.log('Token is valid:',decoded);
                    const tokennew = Gtoken.generarToken({ rol, email });
                    res.cookie('authToken', tokennew, { httpOnly: true,secure: true });
                    console.log("token refrescado exitosamente")
                    aux.mostrarVentanas2(res,rol);
                  
                } catch (error) {
                    console.error('Token-refresh validation error:', error.message);

                    if(error.message === 'Token has expired.' || error.message === 'Token does not exist.' ) {
                      return  res.render('login/inicio')
                    }

                    if(error.message === 'Token is altered.' || error.message === 'Token verification failed.') {
                      return  res.status(401).json({ message: 'Token asido alterado', expired: true });
                    }
                    
                }
            }
            if(error.message === 'Token has expired.' || error.message === 'Token does not exist.' ) {
               return res.render('login/inicio')
            }

            if(error.message === 'Token is altered.' || error.message === 'Token verification failed.') {
                return res.render('login/inicio')
              
            }
            
     }}

     if (!token) {
        res.render('login/inicio'); // Si no hay token, devuelve un error 401
    } else {
        verificartoken();
     }

  
        
        },
     //-----------------------------------------|

    //-----------------------------------------|
    verificar:function(req,res){

       async  function para() {
        var username=req.body.username; 
        var password=req.body.password;
        // buscando usuario en la bd
        try {
            var  respuestabd = await model.buscarusuario(conexion,username,password)
            console.log("tu respuesta de la bd es  ; " + respuestabd)

            const payload = {
                rol:respuestabd.id_rol,
                nombre:respuestabd.usuario,
                email:respuestabd.correo,
            }


            const payload2 = {
                rol:respuestabd.id_rol,
                nombre:respuestabd.usuario,
                email:respuestabd.correo,
                refresh:'true'
            }

            console.log(payload)
           
            const token = Gtoken.generarToken(payload);
            res.cookie('authToken', token, { httpOnly: true,secure: true });
            const refreshToken = Gtoken.refreshToken(payload2);
            res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });

           aux.mostrarVentanas2(res,respuestabd.id_rol)

       
            //aux.craertokens(res,respuestabd)
        } catch (error) {
            console.error('Error al buscar usuario:', error.message);
            res.render('login/inicio',{err:"usuario o contraseña no valido por ⬇ favor  crea una cuenta "});
        }
        
        }

        para()

        

 
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
        }

        const payload2 = {
            rol:req.body.rol,
            nombre:req.body.fullname,
            email:req.body.email,
            refresh:'true'
        }

        // generarando token y almacenando lo en la cokkie
        const token = Gtoken.generarToken(payload);
        const refreshToken = Gtoken.refreshToken(payload2);

        res.cookie('authToken', token, { httpOnly: true,secure: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });

        model.insertarUsuario(conexion,datos)
         .then(() => {
            console.log("usuario ingresado"); // Esto se ejecuta si la promesa se resuelve
          })
          .catch((error) => {
            console.error(error); // Esto se ejecuta si la promesa se rechaza
          });

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

         req.flash('correo', req.body.email);

       
         req.session.Verificacioncodes={}
         res.render('login/codigo')

        async function enviar () {
            
            
            try {
              
                const codigo = await generarcodigo.generarcodigo()
                console.log('tu codigo es : ' + codigo)
                req.session.Verificacioncodes[req.body.email] = codigo
                console.log(req.session.Verificacioncodes)
               
               // console.log( "::::" + Object.keys(Verificacioncodes)+":::"+Object.values(Verificacioncodes) )
                const respuesta = await email.enviaremail(req.body.email,codigo)
               
                console.log('Correo enviado correctamente : '+ respuesta);
            } catch (error) {
                
            }
        }
        enviar();

        
    },
    //-----------------------------------------|

    //-----------------------------------------|
    confirmar:function(req, res){


        async 

        

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
    update:function(req, res){
       
        const gmail=req.flash('correo')
        const password=req.body.password;

        console.log("hola mundo :" + req.body.password+"gmail : "+gmail)

        async function enviarcontra() {

            try {
                var rsult = await model.updatepassword(conexion,gmail,password);
                console.log("la respuesta de la bd es :"+rsult)
                res.send("contraseña actualizada correctamente")
                
            } catch (error) {

                console.error('Error al actualizar contraseña:', error.message);
                res.send("hubo un error al actualizar la contraseña")
                
            }

            
        }


        enviarcontra()

      
        
    },
   

    findUser: async function (user) {
        try {
          return await model.FindUser(conexion, user);
        } catch (error) {
            console.error('usuario no encontrado');
        }
    },

    

    findByEmail: async function (email) {
        try {
          return await model.FindByEmail(conexion,email);
        } catch (error) {
            console.error('correo no encontrado');
        }
    },

 

  
}//fin
    //-----------------------------------------|

    //-----------------------------------------|
    //-----------------------------------------|


    //funciones que no se exportan 

   
       
    
    //-----------------------------------------|

    //-----------------------------------------|
   



    
