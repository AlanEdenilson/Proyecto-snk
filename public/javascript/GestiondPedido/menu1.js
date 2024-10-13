$(document).ready(function() {
    console.log('pagina uno cargada')
    $('.boton-editar').css({'display':'none'})
    $('.boton-salir-editar').css({'display':'none'})

    $('.delete').css({'display':'none'})

    $.ajax({
        url: '/gestion/datos2',
        type: 'GET',
        success: function(response) {
            console.log(response);
          
            response.forEach(function(item) {
                var html = `
                <tr id="${item.pedidos_ids}" data-id="${item.pedidos_ids}">
               <td><span class="mdi--account-multiple-check"></span></td>
                <td> ${item.total_cantidad}</td>
                <td> $ ${item.total_pedido}</td>
                <td> ${item.nombre_repartidor}</td>
                <td id="fecha" > ${item.fecha_entrega}</td>
                <td><button class="detalles-btn"><span id="icono" class="ion--arrow-up-right-box-outline"></span></button></td>
        </tr> 
            
            `;
            $('#tabla1').append(html);
            });
            
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la página:', error);
        }
    });


    $('#tabla1').on('click', '.detalles-btn', function() {
        var id = $(this).closest('tr').data('id');
        console.log('ID del pedido:', id);
        // Agrega aquí la lógica para mostrar los detalles

        $("#contenedor-productos").load("/gestion/detall1", function(response, status, xhr) {
            Dmenu3.cargar1(id)
            if (status == "error") {
                console.log("Error al cargar la página: " + xhr.status + " " + xhr.statusText);
                $("#contenedor-productos").html("<p>Error al cargar el contenido. Por favor, intente de nuevo.</p>");
            }
        });
    });

});