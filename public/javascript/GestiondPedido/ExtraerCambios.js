$( function() {
    console.log('ExtraerCambios.js cargado');
    
        $(document).on('click', '#boton-extraer',async function() {
            console.log('Botón extraer clickeado');
            $('.overlay').show();
            $('.animacion-extraccion').show();

            try {
                await Modulo1.initDB();
                console.log('Extraendo pedidos nuevos')
                const ultimoId = await Modulo1.obtenerUltimoId();
                    const nuevoPedido = await Modulo2.Optimus.realizarPeticionAjax('/gestion/vernuevosregistros?rango=',ultimoId);
                    const resultado = await Modulo2.Optimus.modificarNumeroExtraccion(0);
                    console.log(resultado);
            // Guardar los nuevos pedidos en la base de datos
            if (nuevoPedido && nuevoPedido.datos && nuevoPedido.datos.length > 0) {
                await Modulo1.guardarPedidos(nuevoPedido.datos.map(item => ({
                    id: item.pedidos_ids,
                    fecha: item.fecha_hora_pedido,
                    repartidor: item.repartidor,
                    repartidorn:'no asignado',
                    fecha_entrega: item.fecha_entrega,
                    estado: item.estados,
                    total: item.total_pedido,
                    cantidad: item.total_cantidad,
                    Aceptado: false
                })));
                console.log("Nuevos pedidos guardados exitosamente en IndexedDB");
                await Modulo1.refrescarBD();
               
            } else {
                console.log("No hay nuevos pedidos para guardar");
            }
              
            } catch (error) {
                console.error('Error al extraer los cambios:', error);
            }

            setTimeout(function() {
                $('.spinner').hide();
                $('.text-spinner').hide();
                $('.check-success').show();
            }, 2000);

            setTimeout(function() {
                $('.check-success').hide();
                $('.overlay').hide();
                $('.animacion-extraccion').hide();
            }, 4000);
            
           
        });
    
});

