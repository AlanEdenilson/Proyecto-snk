

$(function(){

$.ajax({
    url: '/users/vermarcas',
    method: 'GET',
    success: function(data) {
        console.log('Datos 1 recibidos:', data);
        $('#imagen').attr('src',data[0].imagen)
        $('#nombre').text(data[0].nombre)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la petición:', textStatus, errorThrown);
    }
});

$.ajax({
    url: '/users/verpedido',
    method: 'GET',
    success: function(data) {
        console.log('Datos 2 recibidos:', data);
        
        data.forEach(function(item) {

            var html = `
                <tr>
                    <td id="pedido">${item.pedido_id}</td>
                    <td id="Nombre">${item.nombre}</td>
                    <td id="Ntienda" >${item.tienda_nombre}</td>
                    <td id="fechaE">${item.fecha_hora_pedido}</td>
                    <td id="fechaEn">${item.fecha_entrega}</td>
                    <td><button class="boton">Entregado</button>
                        <button class="boton2">No Entregado</button></td></td>
                        <td><button id="openModal">Pedido</button></td>         
                    <td id="total">${item.total_pedido}</td>
                </tr>
            `;
            $('#tabla').append(html);

        });
        
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la petición:', textStatus, errorThrown);
    }
});



$('#tabla').off('click', '.boton').on('click', '.boton', function() {
    alert('Entregadooo');
});

$('#tabla').off('click', '.boton2').on('click', '.boton2', function() {
    alert('No Entregadooo');
});


})