
var model = require('../../model/GestiondPedido/index');


module.exports = {
    verpedidos: async (req,res)=>{
        try{
            model.verpedidos(conexion,function(err,results){
                if(err){
                    console.log(err);
                }else{
                    res.render('gestionDpedido/verpedidos',{results:results});
                }
            });
        }catch(error){
            console.log(error);
        }
    }
}