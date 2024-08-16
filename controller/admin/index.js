const { parseJSON } = require('date-fns');
const conexion = require('../../config/conexion');
const model=require('../../model/adminc/index')




module.exports={

    marca:function(req,res){
        const json = JSON.stringify(req.body);

        res.send(`${json}--${req.file.filename}`)


      /* async function insertar() {

        try {
            const respuesta= await model.insertarmarca(conexion,)
        } catch (error) {
            
        }
            
        }*/



        

        
    }



}


