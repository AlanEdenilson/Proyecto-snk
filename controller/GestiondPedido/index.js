
var model = require('../../model/GestiondPedido/index');
var conexion=require('../../config/conexion');


module.exports = {
    verpedidos: async (req,res)=>{
        try{
            model.verpedidos(conexion,function(err,results){
                if(err){
                   throw err;
                }else{
                    console.log(results);
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

},
AplicationChange: async (req,res)=>{

  // Crear una nueva lista con los datos requeridos
  let change = [];
  const arr=JSON.stringify(req.body);
            
  // Iterar sobre cada pedido y agregarlo a la lista 'change'
  req.body.forEach(pedido => {
      const pedidoLimpio = {
          id: pedido.id,
          repartidor: pedido.repartidor,
          estado: pedido.estado,
          fecha_entrega: pedido.fecha_entrega
      };
      change.push(pedidoLimpio);
  });
 
  //res.json({ mensaje: 'Datos recibidos y procesados correctamente', datos: change });

    try {
        // Procesar cada pedido en la lista 'change'
        for (let pedido of change) {
            // Preparar los datos para la actualización
            const datosActualizacion = [
                pedido.repartidor,
                pedido.estado,
                pedido.fecha_entrega,
                pedido.id
            ];
            // Llamar a la función AplicationChange del modelo
            await new Promise((resolve, reject) => {
                model.AplicationChange(conexion, datosActualizacion, function(err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        }

        // Enviar respuesta de éxito
        res.json({ mensaje: 'Todos los pedidos han sido actualizados correctamente' });
    } catch (error) {
        console.error('Error al actualizar los pedidos:', error);
        res.status(500).json({ error: 'Error al procesar la actualización de pedidos' });
    }

},
verRepart: async (req,res)=>{
    try{
        model.verRepart(conexion,function(err,results){
            if(err){
                throw err;
            }else if(results.length > 0){
                console.log(results);
                res.send(results);
            }else{
                res.send([]);
            }
        });
    }catch(error){
        console.log(error);
    }
},
cargarcontenido:async function(req,res){
    console.log(req.params.id)
    var r;
    if(req.params.id==1){
        r='e';
    }
    if(req.params.id==2){
        r=2;
    }
    if(req.params.id==3){
        r='activado';
    }
    if(req.params.id==4){
        r=4;
    }
    console.log(r)
    try {
        model.loadContent(conexion,r,function(err,results){
            if(err){
                throw err;
            }else{
                res.send(results);
            }
        });


    } catch {

    }

},

cargarcontenido2:async function(req,res){
   
     try{
        model.loadContent2(conexion,function(err,results){
            if(err){
                throw err;
            }else{
                res.send(results);
                console.log(results)
            }
        });
     }catch(error){
        console.log(error);
    }
    
    
},
pedidosEnprocesos:async function (req,res){
    try {
        model.pedidosEnprocesos(conexion,function (err,results) {
            if (err) {
                throw err
                
            } else {
                res.send(results)
            }
        })

    } catch(error) {
        res.send('a ocurrido un error en el server')


    }
}
}