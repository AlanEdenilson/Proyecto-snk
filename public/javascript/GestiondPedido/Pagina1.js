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
                    repartidor: item.repartidor,
                    repartidorn:'no asignado',
                    fecha_entrega: item.fecha_entrega,
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


// Crear un array de repartidores
            const repartidores = [
                { id: 1, nombre: "Juan Pérez" },
                { id: 2, nombre: "María García" },
                { id: 3, nombre: "Carlos Rodríguez" },
                { id: 4, nombre: "Ana Martínez" },
                { id: 5, nombre: "Luis Sánchez" }
            ];

            // Guardar el array en el localStorage
            localStorage.setItem('repartidores', JSON.stringify(repartidores));

            console.log('Array de repartidores guardado en localStorage');


// Escuchar el evento de cambio en el select con id 'repartidor'
$(document).on('click', '#repartidor',async function() {
    // Obtener los repartidores del localStorage
    const repartidoresGuardados = JSON.parse(localStorage.getItem('repartidores'));
    
    if (repartidoresGuardados) {
        if ($(this).find('option').length < 5) {
            $(this).empty();
           
            for (let i = 0; i < repartidoresGuardados.length; i++) {
                $(this).append(`<option value="${repartidoresGuardados[i].id}">${repartidoresGuardados[i].nombre}</option>`);
            }
        }
    }

    $(this).on('change',async  function() {
        try {
            await Modulo1.initDB()
           var e= await Modulo1.editar('28,29', 'repartidor', 1);
           var l= await Modulo1.editar('28,29', 'repartidorn', 'alan');
            console.log("Campo actualizado exitosamente", e);
            await Modulo1.refrescarBD()
        } catch (error) {
            console.error("Error al actualizar el campo:", error);
        }
           
        });

  
    
});
        

    
    



     


});