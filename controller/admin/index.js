
const conexion = require('../../config/conexion');
const model=require('../../model/adminc/index')
const Gtoken = require('../login/Gtoken');
const GenerarID=require('../login/generarcodigo')
//const fs = require('fs').promises;
//const path = require('path');
const cloudinary=require('../cloudinar')





module.exports={

    marca:async function(req,res){
        
        
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        


        try {

          const result = await cloudinary.subir(dataUri,{ use_filename: true, unique_filename: false })
          req.session.imagen=result.secure_url;
          req.session.idImagen=result.public_id;

          console.log(`desde el controlador imagen url:${result.secure_url} mas el id :${result.public_id}`)
          const token = req.cookies.authToken;
                var vtoken = await Gtoken.validarToken2(token);
                console.log("El token es válido:", vtoken);
                var id_admin = vtoken.id;
                req.session.admin=vtoken.nombre;
    
                const resulta = await model.insertarmarca(conexion,result.public_id,result.secure_url,req.body)
                const principalId = resulta.insertId;
                console.log(principalId)

                await model.infoadmin(conexion,principalId,id_admin)

                const gcodigo= await GenerarID.generarid();

                const update= await model.isertId(conexion,principalId,gcodigo);

                //const uddates= await model.isertIdadmin(conexion,gcodigo,id_admin);

                res.render('admin/id',{codigo:gcodigo})
          
        } catch (error) {
          console.log(error)
          
        }
        

       // insert()

        


        
    },

    updt:function (req,res) {
        var imagen=req.session.imagen;
        var nombre=req.session.admin;
        delete req.session.admin
        delete req.session.imagen;
        res.render('login/ventanaAdmin',{imagen:imagen,nombre:nombre})

       // var rmarca= await model.buscarmarca(conexion,respuestabd.id)
    },


    addproductos:async function(req,res){
        const perfil = req.cookies.perfil;
        console.log(req.body)
        console.log(req.file)
            try {
              const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
              const result = await cloudinary.subir(dataUri)
              
             // if (typeof result.secure_url!=='undefined') {
                console.log(`desde el controlador imagen url:${result.secure_url} mas el id :${result.public_id}`)
                await model.addproducts(conexion,perfil.marca,result.public_id,result.secure_url,req.body)
                res.send('resibido con exito')
             // } 
            } catch (error) {
              res.status(400).send(error.message || 'Ocurrió un error al procesar el formulario');
            }
            
       


    },

    mostar:function(req, res){
        const perfil = req.cookies.perfil;
       

        model.mostar(conexion,perfil.marca)
        .then((datos)=>{
            res.json(datos)
        })

        
        .catch((error)=>{

        })


    },
    delete: async  function(req, res){


        // ... dentro de la función delete
        try {
          const datos = await model.mostarparad(conexion,req.params.id);
          const imgPath =datos[0].id_imagen;
          console.log('imagen de cloudinary'+imgPath)

          if(!imgPath){
            console.log('la imagen no existe ')
          }

          const result= await cloudinary.delete(imgPath)
          if (result.result === 'ok') {
            console.log('Imagen borrada exitosamente');
          } else {
            console.log('Imagen no encontrada' );
          }
        
        await model.delete(conexion, req.params.id);
        console.log('Borrado exitosamente');
        res.json({id:req.params.id});
        } catch (error) {
        console.error('Error al borrar:', error);
        res.status(500).send({msg: 'Error al borrar el archivo', error: error.message});
        }

    },

    actualizar:function(req,res) {
        const userId = req.params.id;
        console.log(userId)
        
        
          
        const updatedData =req.body;

        for (const [key, value] of Object.entries(updatedData)) {
                    
          
            console.log(`${key}: ${value}`);
          }
        const updatedData1 =JSON.stringify(req.body);
      /*  for (const [key, value] of Object.entries(updatedData)) {
            console.log(`${key}: ${value}`);
          }*/
        



          async function update() {
            try {
              var i;
                 if (updatedData1 ==='{}') {
                  console.log('no hay cambios de texto ')
                  res.send('no hay cambios que aser')
          
            
                }else{
                  for (const [key, value] of Object.entries(updatedData)) {
                    
                    i=await model.updateproduct(conexion,key,value,userId)
                    console.log(i)
                    console.log(`${key}: ${value}`);
                  }

                  res.send('actualizado con exito')
        
                  
        
                }

        
                
            } catch (error) {
                
            }
            
          }

          update();

       /* if ( updatedData1==='{}') {
            console.log('no se proporcionaron  cambio')
            
        }else{
            update();
        }*/

        
        
    },

    actualizar2: function(req,res) {
        const userId = req.params.id;

       console.log(req.params.id) 
        
     
        const updatedData = req.body;
        
   
  
        for (const [key, value] of Object.entries(updatedData)) {
                    
          
            console.log(`${key}: ${value}`);
          }
        const updatedData1 =JSON.stringify(req.body);
      /*  for (const [key, value] of Object.entries(updatedData)) {
            console.log(`${key}: ${value}`);
          }*/
        
          async function update() {
            try {
              
                const datos = await model.mostarparad(conexion,req.params.id);
                const imgPath =datos[0].id_imagen;
                console.log('imagen de cloudinary'+imgPath)

               // if (!imgPath) {
               //   return res.status(404).json({ error: 'Imagen no encontrada' });
               // }

                const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
                const result = await cloudinary.actualizar(dataUri,imgPath)
                console.log(`desde el controlador imagen url:${result.secure_url} mas el id :${result.public_id}`)

                const r=await model.updateimagen(conexion,result.secure_url,userId)
                  console.log('imagen guardada ?'+r)

                  if (updatedData1 ==='{}') {
                    console.log('no hay cambios de texto ')
                    res.send('no hay cambios que aser')
            
              
                  }else{
                    for (const [key, value] of Object.entries(updatedData)) {
                      
                      i=await model.updateproduct(conexion,key,value,userId)
                      console.log(i)
                      console.log(`${key}: ${value}`);
                    }
                  }

                  res.send('actualizado con exito')





              /*  if(datos[0].imagen===imagen){
                  console.log('la imagen que has roporcionado es la misma asi que no se puede actualizar ')

                }else{
                  console.log('Intentando borrar:', imgPath);

                  const r=await model.updateimagen(conexion,imagen,userId)
                  console.log('imagen guardada ?'+r)*/
  
                 /* 

                }
            //----------
                if (updatedData1 ==='{}') {
                  console.log('no hay cambios de texto ')
                  res.send('no hay cambios que aser')
          
            
                }else{
                  for (const [key, value] of Object.entries(updatedData)) {
                    
                    i=await model.updateproduct(conexion,key,value,userId)
                    console.log(i)
                    console.log(`${key}: ${value}`);
                  }

                  res.send('actualizado con exito')
        
                  
        
                }*/
 
            } catch (error) {
                
            }
            
          }
          update();


        
    }
   

   



}


