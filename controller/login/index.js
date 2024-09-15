
var email=require('./enviargmail');
var random=require('./generarcodigo');
var conexion = require('../../config/conexion');
//var gtoken=require('../Gtoken')
const Gtoken = require('./Gtoken');
const model = require('../../model');
const aux=require('./auxiliar');
const generarcodigo = require('./generarcodigo');







module.exports={

    login:function(req,res){
        const token = req.cookies.authToken;
        async function verificartoken() {
            try {
              var vtoken = await Gtoken.validarToken2(token);
              console.log("El token es válido:", vtoken);
              var rol = vtoken.rol;
              const touken = req.cookies.perfil;
              
            
              console.log("al macenado con exito")
              return aux.mostrarventanas(res,rol,touken);
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

            var marca= await model.buscarmarca(conexion,respuestabd.id)
            

            var payload
            var payload2

            payload = {
              id:respuestabd.id,
             rol:respuestabd.rol,
             nombre:respuestabd.usuario,
             email:respuestabd.email,
         }
  
  
            payload2 = {
             id:respuestabd.id,
             rol:respuestabd.rol,
             nombre:respuestabd.usuario,
             email:respuestabd.email,
             refresh:'true'
         }

           if(marca.respuesta){
            payload.imagen = marca.datos.imagen;
            payload.marca = marca.datos.id;
            payload2.imagen = marca.datos.imagen;
            payload2.marca = marca.datos.id;
            }
            console.log(payload)
           
            const token = Gtoken.generarToken(payload);
            res.cookie('authToken', token, { httpOnly: true,secure: true });
           // res.cookie('correo', respuestabd.correo,);
           // console.log("cokkie de correo almacenado con exito")
            const refreshToken = Gtoken.refreshToken(payload2);
            res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });
            //res.cookie('correo', respuestabd.correo, { httpOnly: true,secure: true });
            //aux.mostrarVentanas2(res,respuestabd.rol,respuestabd.usuario)

            if(marca.respuesta){
              var imagen=marca.datos.imagen;
              var play={
                marca:marca.datos.id,
                imagen:imagen,
                nombre:respuestabd.usuario
              }
              res.cookie('perfil',play,{ httpOnly: true,secure: true });
              
              
              aux.mostrarVentanas2(res,respuestabd.rol,imagen,respuestabd.usuario)
            }else{
              aux.mostrarventanas(res,respuestabd.rol)

            }


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
    verificarCuenta: async function(req, res){ 
        var datos = req.body;
        console.log(datos);


       


        //crenado los datos a almacenar en la cokkie 

        // generarando token y almacenando lo en la cokkie
      

        try {
          var result = await model.insertarUsuario(conexion,datos)
          const principalId = result.insertId;

          console.log(principalId)
      


          if(req.body.rol==='repartidor'){
            await model.inforepar(conexion,principalId)
            console.log('insertado el repartidor') 
          }else{
            await model.infoadmin(conexion,principalId) 
            console.log('insertado el admin')

          }
          const payload = {
            id:result.insertId,
            rol:req.body.rol,
            nombre:req.body.fullname,
            email:req.body.email,
        }
  
  
        const payload2 = {
            id:result.insertId,
            rol:req.body.rol,
            nombre:req.body.fullname,
            email:req.body.email,
            refresh:'true'
        }
  
        const token = Gtoken.generarToken(payload);
        const refreshToken = Gtoken.refreshToken(payload2);
          
  
          res.cookie('authToken', token, { httpOnly: true,secure: true });
          res.cookie('refreshToken', refreshToken, { httpOnly: true,secure: true });
         
          aux.mostrarVentanas2(res,req.body.rol)

        
        } catch (error) {
          console.error('Error al insertar usuario:', error.message);

          
        }

        

        
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

    admin:function(req,res) {
      
    }

 

  
}//fin
    //-----------------------------------------|

    //-----------------------------------------|
    //-----------------------------------------|


    //funciones que no se exportan 

   
       
    
    //-----------------------------------------|

    //-----------------------------------------|
   



    
