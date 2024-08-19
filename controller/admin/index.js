
const conexion = require('../../config/conexion');
const model=require('../../model/adminc/index')
const Gtoken = require('../login/Gtoken');
const GenerarID=require('../login/generarcodigo')
const delet=require('fs')




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
        
        

       try {
        var datos= await model.mostarparad(conexion,req.params.id)
        var img ='/public/images/'+datos[0].imagen
        console.log('/images/',datos[0].imagen)
        if (delet.existsSync(img)) {
            delet.unlinkSync(img)
        }

        await model.delete(conexion,req.params.id)
        console.log('borrado exitosamnete')
        res.send({msg:'borrado exitosamnete'})

       } catch (error) {
        
       }


    }

   



}


