$(function(){
    console.log('menu4 cargado ...')
    $('.boton-editar').css({'display':'none'})
    $('.boton-salir-editar').css({'display':'none'})

    $('.delete').css({'display':'none'})
    $.ajax({
        url: '/gestion/cancelados',
        type: 'GET',
        success: function(response) {
            console.log(response);
          
            response.forEach(function(item) {
                var html = `
                <tr id="${item.pedidos_ids}" data-id="${item.pedidos_ids}">
                <td><span class="mdi--account-multiple-check"></span></td>
                    <td>${item.fecha_hora_pedido}</td>
                    <td> ${item.total_cantidad}</td>
                    <td> $ ${item.total_pedido}</td>
                    <td> ${item.nombre_repartidor}</td>
                    <td id="fecha" > ${item.fecha_entrega}</td>
                    <td><button class="detalles-btn"><span id="icono" class="ion--arrow-up-right-box-outline"></span></button></td>
                </tr> 
            
            `;
            $('#table4 ').append(html);
            });
            
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la página:', error);
        }
    });


})