$(document).ready(function() {
    console.log('pagina uno cargada')

    $.ajax({
        url: '/gestion/datos2',
        type: 'GET',
        success: function(response) {
            console.log(response);
            var html='';
            response.forEach(function(item) {
                html += `
                <tr id="${item.pedidos_ids}" data-id="${item.pedidos_ids}">
                 <td>hh<td>
                <td> ${item.total_cantidad}</td>
                <td> $ ${item.total_pedido}</td>
                <td> ${item.nombre_repartidor}</td>
                <td > ${item.fecha_entrega}</td>
                <td><button class="detalles-btn">m</button></td>
        </tr> 
            
            `;
            $('#tabla').append(html);
            });
            
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar la página:', error);
        }
    });










});