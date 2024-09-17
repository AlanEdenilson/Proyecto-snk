
var model = require('../../model/GestiondPedido/index');
var conexion=require('../../config/conexion');


module.exports = {
    verpedidos: async (req,res)=>{
        try{
            model.verpedidos(conexion,function(err,results){
                if(err){
                   throw err;
                }else{
                    res.send(results);
                }
            });
        }catch(error){
            console.log(error);
        }
    }
}