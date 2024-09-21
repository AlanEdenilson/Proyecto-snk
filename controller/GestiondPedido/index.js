
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
    },
    detalles: async (req,res)=>{
        // Crear un array de números con los IDs recibidos de req.query.id
        // El número 10 en parseInt(id, 10) especifica la base numérica.
        // En este caso, 10 indica que los números se interpretan en base decimal.
        // Esto asegura que los IDs se conviertan correctamente a enteros,
        // evitando problemas con sistemas que podrían interpretar números con ceros iniciales como octales.
        const idsArray = req.query.id.split(',').map(id => parseInt(id, 10));
        
        // Filtrar valores no numéricos
        const idsValidos = idsArray.filter(id => !isNaN(id));
        
        console.log('IDs válidos:', idsValidos);

        try{
            model.detalles(conexion,idsValidos,function(err,results){
                if(err){
                   throw err;
                }else{
                    console.log(results[0]);
                    res.send(results);
                }
            });
        }catch(error){
            console.log(error);
        }
    },
    vernuevosregistros: async (req,res)=>{

        // Extraer la cookie 'perfil'
        const perfilCookie = req.cookies.perfil;
        
         console.log(perfilCookie.marca);
         try{
            model.verpedidosnuevos(conexion,req.query.rango,function(err,results){
                if(err){
                   throw err;
                }else{
                    res.json({datos:results, nuevosRegistros: results.length });
                }
            });

         }catch(error){
        res.send('resibido en el servidor');
    }

}
}