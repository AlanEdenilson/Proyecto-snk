
var model = require('../../model/GestiondPedido/index');
var conexion=require('../../config/conexion');
const Gtoken = require('../login/Gtoken');


module.exports = {
    verpedidos: async (req,res)=>{

        const token = req.cookies.authToken;
        try{
            
            var vtoken = await Gtoken.validarToken2(token);
            
            model.verpedidos(conexion,vtoken.marca,function(err,results){
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
                    console.log(results);
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
        const token = req.cookies.authToken;
    
        var vtoken = await Gtoken.validarToken2(token);
        model.verRepart(conexion,vtoken.marca,function(err,results){
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
        r='activado';
    console.log(r)
    try {

        const token = req.cookies.authToken;
        var vtoken = await Gtoken.validarToken2(token);
        model.loadContent(conexion,vtoken.marca,function(err,results){
            if(err){
                throw err;
            }else{
                res.send(results);
            }
        });


    } catch {
        res.send('error en el servidor')

    }

},

cargarcontenido2:async function(req,res){
     try{
        const token = req.cookies.authToken;
    
        var vtoken = await Gtoken.validarToken2(token);
        model.loadContent2(conexion,vtoken.marca,function(err,results){
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
        const token = req.cookies.authToken;
    
        var vtoken = await Gtoken.validarToken2(token);
        console.log( vtoken)
        model.pedidosEnprocesos(conexion,vtoken.marca,function (err,results) {
            if (err) {
                throw err
                
            } else {
                res.send(results)
            }
        })
    } catch(error) {
        res.send('a ocurrido un error en el server')
    }
},
borar: async function (req,res){
    function convertirListaAObjetos(listaNumeros) {
        return listaNumeros.map(numero => ({
            id: numero,
            motivo: "motivo desconocido"
        }));
    }

    var t = req.body.ids;
    console.log(t);
    
    var nuevaLista = [];
    
    for (let i = 0; i < t.length; i++) {
        let elemento = t[i];
        if (typeof elemento === 'string') {
            let numeros = elemento.split(',');
            for (let j = 0; j < numeros.length; j++) {
                let numero = parseInt(numeros[j].trim(), 10);
                if (!isNaN(numero)) {
                    nuevaLista.push(numero);
                }
            }
        } else if (typeof elemento === 'number') {
            nuevaLista.push(elemento);
        }
    }
    
    console.log(nuevaLista);

    try {
        await model.borarr(conexion,nuevaLista);
        await model.borar1(conexion,nuevaLista);

        const listaDeObjetos = convertirListaAObjetos(nuevaLista);

         console.log(listaDeObjetos);

//   
        await model.insercancelado(conexion,listaDeObjetos)
        res.send('capturado');
    } catch(error) {
        res.send('a ocurrido un error en el server')
    }
    
},
rechazados:async function (req,res){
    try {
        const token = req.cookies.authToken;
        
        
    
        var vtoken = await Gtoken.validarToken2(token);
        console.log( vtoken)


        model.loadContent4(conexion,vtoken.marca,function (err,results) {
            if (err) {
                throw err
            } else {
                console.log(results)
                res.send(results)
            }
        })
    } catch(error) {
        res.send('a ocurrido un error en el server')
    }
},
}


            

    // [  { id: 163, motivo: 'motivo desconocido ' },
    //   { id: 164, motivo: 'motivo desconocido ' },
    //   { id: 165, motivo: 'motivo desconocido ' },
    //   { id: 166, motivo: 'motivo desconocido ' },
    //   { id: 167, motivo: 'motivo desconocido ' },
    //   { id: 156, motivo: 'motivo desconocido ' },
    //   { id: 157, motivo: 'motivo desconocido ' },
    //   { id: 152, motivo: 'motivo desconocido ' },
    //   { id: 153, motivo: 'motivo desconocido ' },
    //   { id: 148, motivo: 'motivo desconocido ' },
    //   { id: 149, motivo: 'motivo desconocido ' },
    //   { id: 146, motivo: 'motivo desconocido ' },
    //   { id: 147, motivo: 'motivo desconocido ' },
    //   { id: 143, motivo: 'motivo desconocido ' },
    //   { id: 144, motivo: 'motivo desconocido ' },
    //   { id: 145, motivo: 'motivo desconocido ' },
    //   { id: 131, motivo: 'motivo desconocido ' },
    //   { id: 132, motivo: 'motivo desconocido ' },
    //   { id: 133, motivo: 'motivo desconocido ' },
    //   { id: 129, motivo: 'motivo desconocido ' },
    //   { id: 130, motivo: 'motivo desconocido ' },
    //   { id: 127, motivo: 'motivo desconocido ' },
    //   { id: 128, motivo: 'motivo desconocido ' },
    //   { id: 47, motivo: 'motivo desconocido ' },
    //   { id: 48, motivo: 'motivo desconocido ' },
    //   { id: 40, motivo: 'motivo desconocido ' },
    //   { id: 39, motivo: 'motivo desconocido ' },
    //   { id: 34, motivo: 'motivo desconocido ' },
    //   { id: 35, motivo: 'motivo desconocido ' },
    //   { id: 31, motivo: 'motivo desconocido ' },
    //   { id: 32, motivo: 'motivo desconocido ' }
    //         ]