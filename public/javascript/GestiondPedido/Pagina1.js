$( async function () {
        // Función para verificar si la base de datos existe y inicializarla

        // Llamar a la función de verificación e inicialización

        function cargarDatos(){
        $.ajax({
            url: "/gestion/verpedidos",
            type: "GET",
            success: function(response) {
                console.log(response);
                var arrayRecuperado = response;
            // Inicializar la base de datos
            Modulo1.initDB().then(() => {
                // Guardar los pedidos en la base de datos
                return Modulo1.guardarPedidos(arrayRecuperado.map(item => ({
                    id: item.pedidos_ids,
                    fecha: item.fecha_hora_pedido,
                    estado: item.estados,
                    total: item.total_pedido,
                    cantidad: item.total_cantidad,
                    Aceptado:false
                })));
            }).then(() => {
                console.log("Pedidos guardados exitosamente en IndexedDB");
            }).catch(error => {
                console.error("Error al guardar los pedidos en IndexedDB:", error);
            });
            
            },

            //eror
            error: function(xhr, status, error) {
                console.error("Error al cargar el contenido:", error);
            }
        });
            }   
             try {
                await Modulo1.initDB();
               var numero = await Modulo1.contarRegistros()
               console.log('numero de registros inicio', numero)
               if(numero == 0){
                cargarDatos()
               }
                
            } catch (error) {
                
            }
            
          

        
        $(".container").load("/gestion/pagina1", function(response, status, xhr) {
           Modulo1.cargarDatos()
            if (status == "error") {
                var msg = "Lo siento, ocurrió un error: ";
                $(".container").html(msg + xhr.status + " " + xhr.statusText);
            }
        });
        

    
    



     


});