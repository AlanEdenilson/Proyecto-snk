
var email=require('../login/enviargmail');
var random=require('../login/generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
const Gtoken = require('../login/Gtoken');
const model = require('../../model');
const aux=require('../login/auxiliar');
const generarcodigo = require('../login/generarcodigo');







module.exports={

    login:function(req,res){
        const token = req.cookies.authToken;
        async function verificartoken() {
            try {
              var vtoken = await Gtoken.validarToken2(token);
              console.log("El token es válido:", vtoken);
              var rol = vtoken.rol;
 
              console.log("al macenado con exito")
              return aux.mostrarVentanas2(res, rol);
            } catch (error) {
              console.error("Error de validación del token:", error.message);
              if (error.message === "Token has expired.") {
                const refreshToken = req.cookies.refreshToken;
                try {
                  const decoded = await Gtoken.validarRefreshToken(refreshToken);
                  const { rol, email } = decoded;
                  console.log("El token es válido:", decoded);
                  const tokennew = Gtoken.generarToken({ rol, email });
                  res.cookie('authToken', tokennew, { httpOnly: true, secure: true });
                  console.log("token refrescado exitosamente");
                  return aux.mostrarVentanas2(res, rol);
                } catch (error) {
                  console.error("Error de validación del token de actualización:", error.message);
                  if (error.message === "Token has expired." || error.message === "Token does not exist.") {
                    return res.render('login/inicio');
                  }
                  if (error.message === "Token is altered." || error.message === "Token verification failed.") {
                    return res.status(401).json({ message: "Token ha sido alterado", expired: true });
                  }
                }
              }
              if (error.message === "Token has expired." || error.message === "Token does not exist.") {
                return res.render('login/inicio');
              }
              if (error.message === "Token is altered." || error.message === "Token verification failed.") {
                return res.status(401).json({ message: "Token ha sido alterado", expired: true });
              }
            }
          }


          if (!token) {
            res.render('login/inicio'); // Si no hay token, devuelve un error 401
        } else {
            verificartoken();
         }

       /* const token = req.cookies.authToken;

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
            
     }}*/

   

  
        
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
           // res.cookie('correo', respuestabd.correo,);
           // console.log("cokkie de correo almacenado con exito")
            const refreshToken = Gtoken.refreshToken(payload2);
            res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });
            res.cookie('correo', respuestabd.correo, { httpOnly: true,secure: true });

            aux.mostrarventanas(res,respuestabd.id_rol,respuestabd.correo)
           
           

       
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
      const email = req.cookies.correo;
      req.session.contador=0;
      req.session.codigo =  {};
      


     
    
            
        if (!email) {
              res.render('login/recuperar_contraseña',{correo:"Example@gmail.com"}); // Si no hay token, devuelve un error 401
        } else {
          res.render('login/recuperar_contraseña',{correo:email});
        }



      },
    //-----------------------------------------|

     // funcion para mandar corrreo y codigo generado 

    //-----------------------------------------|
    enviarCorreo:function(req, res){


      req.session.contador=req.session.contador+1;

      console.log("entrando al ruta para generar codigo veses: " + req.session.contador)
         req.session.correo=req.body.email;

        async function enviar () {
            
            
            try {
              
                const codigo = await generarcodigo.generarcodigo()
                console.log('tu codigo es : ' + codigo)
                req.session.codigo[req.body.email] = codigo
               
                console.log(req.session.codigo[req.body.email])
               // console.log( "::::" + Object.keys(Verificacioncodes)+":::"+Object.values(Verificacioncodes) )
               res.render('login/codigo',{correo: req.session.correo})
                const respuesta = await email.enviaremail(req.body.email,codigo)
               
                console.log('Correo enviado correctamente : '+ respuesta);
            } catch (error) {
                
            }
        }

        if (req.session.contador==1) {
          enviar();
        } else {
          
          console.log("codigo de primera vez con otra sesion: " + req.session.codigo[req.body.email])
          res.render('login/codigo',{correo: req.session.correo});
         
        }

        //verificacioCodes=req.session.codigo[req.body.email]

      

        

      

        
    },
    //-----------------------------------------|

    //-----------------------------------------|
    confirmar:function(req, res){
        const code = req.body.codigo;
        console.log("codigo ingreasado es " + code)
        const gmail=req.session.correo;
       console.log('codigo resibido : '+ code + 'gamil' + gmail)
       const verificacioCodes=req.session.codigo;
       
       
        console.log('codigo almacenado con sesion : '+ verificacioCodes[gmail])
       // delete  req.session.Verificacioncodes;

        if ( verificacioCodes[gmail]&& verificacioCodes[gmail] == code) {
          res.json({ valid: true});
        } else {
          res.json({ valid: false });
        }
    },
        // aroon perez
    enviarm:function(req, res){
        res.render("login/marca");
    },
    update:function(req, res){

       
        const gmail=req.session.correo
        const password=req.body.password;

        console.log("hola mundo :" + req.body.password+"gmail : "+gmail)
       

        async function enviarcontra() {

            try {
                var rsult = await model.updatepassword(conexion,gmail,password);
                console.log("la respuesta de la bd es :"+rsult)
                res.json({ valid:true});
                
            } catch (error) {

                console.error('Error al actualizar contraseña:', error.message);
               
                
            }

             
      delete req.session.contador;
      delete req.session.codigo;
      delete req.session.correo;

            
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
   



    
