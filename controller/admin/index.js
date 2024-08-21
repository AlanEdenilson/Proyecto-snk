
const conexion = require('../../config/conexion');
const model=require('../../model/adminc/index')
const Gtoken = require('../login/Gtoken');
const GenerarID=require('../login/generarcodigo')
const fs = require('fs').promises;
const path = require('path');




module.exports={

    marca:function(req,res){
        req.session.imagen=req.file.filename;
        req.session.marca=req.body.nombre;
        
        console.log('nombre de la marca',req.session.marca)



        async function insert(){
            try {
                const token = req.cookies.authToken;
                var vtoken = await Gtoken.validarToken2(token);
                //console.log("El token es válido:", vtoken);
                var id_admin = vtoken.id;
                req.session.admin=vtoken.nombre;
    
                const respuesta= await model.insertarmarca(conexion,id_admin,req.file.filename,req.body)

                const gcodigo= await GenerarID.generarid();

                const update= await model.isertId(conexion,req.session.marca,gcodigo);

                const uddates= await model.isertIdadmin(conexion,gcodigo,id_admin);

                res.render('admin/id',{codigo:gcodigo})


   
    
            } catch (error) {
                console.error(error)
    
                

             }
       

        
        }
        

        insert()

        


        
    },

    updt:function (req,res) {
        var imagen=`/images/${req.session.imagen}`
        var nombre=req.session.admin;
        delete req.session.admin
        delete req.session.imagen;
        res.render('login/ventanaAdmin',{imagen:imagen,nombre:nombre})

       // var rmarca= await model.buscarmarca(conexion,respuestabd.id)
    },


    addproductos:function(req,res){
        const perfil = req.cookies.perfil;
       
        async function add() {
            try {

                await model.addproducts(conexion,perfil.marca,req.file.filename,req.body)
                res.redirect('/ventanaAdmin')
                
            } catch (error) {
                
            }
            
        }


       add()


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
        const datos = await model.mostarparad(conexion, req.params.id);
        const imgPath ="public/images/"+datos[0].imagen;
        
        console.log('Intentando borrar:', imgPath);
        
        try {
            
            await fs.unlink(imgPath);
            console.log('Borrado exitosamente');
            
          } catch (accessError) {
            console.error('El archivo no existe o no se puede acceder:', imgPath);
            return res.status(404).send({ msg: 'Archivo no encontrado' });
          }
        
        await model.delete(conexion, req.params.id);
        console.log('Borrado exitosamente');
        res.json({id:req.params.id});
        } catch (error) {
        console.error('Error al borrar:', error);
        res.status(500).send({msg: 'Error al borrar el archivo', error: error.message});
        }
        
        

       /*try {
        var datos= await model.mostarparad(conexion,req.params.id)
        const img = path.join(__dirname,'images', datos[0].imagen);
        console.log(img)

        if (await fs.access(imgPath).then((

        ) => true).catch(() => false)) {
           
            
            await fs.unlink(imgPath);}
      
        await model.delete(conexion,req.params.id)
        console.log('borrado exitosamnete')
        res.send({msg:'borrado exitosamnete'})

       } catch (error) {
        
       }


    }*/},


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
                for (const [key, value] of Object.entries(updatedData)) {
                    
                    i=await model.updateproduct(conexion,key,value,userId)
                    console.log(i)
                    console.log(`${key}: ${value}`);
                  }

                  res.send('actualizado con exito')

        
                
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

    actualizar2:function(req,res) {
        const userId = req.params.id;
        const imagen= req.file.filename
        console.log(imagen)
        const updatedData = req.body;
        
        console.log(userId)
        
        
       

        for (const [key, value] of Object.entries(updatedData)) {
                    
          
            console.log(`${key}: ${value}`);
          }
        const updatedData1 =JSON.stringify(req.body);
      /*  for (const [key, value] of Object.entries(updatedData)) {
            console.log(`${key}: ${value}`);
          }*/
        



          async function update() {
            try {

                const r=await model.updateimagen(conexion,imagen,userId)
                console.log('imagen guardada ?'+r)
                var i;
                for (const [key, value] of Object.entries(updatedData)) {
                    
                    i=await model.updateproduct(conexion,key,value,userId)
                    console.log(i)
                    console.log(`${key}: ${value}`);
                  }

                  res.send('actualizado con exito')

        
                
            } catch (error) {
                
            }
            
          }

          update();

        /*if (typeof req.body ==='{}') {
            console.log('no se proporcionaron  cambio')
            
        }else{

            console.log(req.body)
            console.log(req.file)

        }*/
        
    }
   

   



}


