

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
        $('#pedido').text(data[0].pedido_id)
        $('#Ntienda').text(data[0].tienda_nombre)
        $('#Nombre').text(data[0].nombre)
        $('#fechaE').text(data[0].fecha_hora_pedido)
        $('#fechaEn').text(data[0].fecha_entrega)
        $('#total').text(data[0].total_pedido)

        $('#pedido1').text(data[1].pedido_id)
        $('#Ntienda1').text(data[1].tienda_nombre)
        $('#Nombre1').text(data[1].nombre)
        $('#fechaE1').text(data[1].fecha_hora_pedido)
        $('#fechaEn1').text(data[1].fecha_entrega)
        $('#total1').text(data[1].total_pedido)


    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la petición:', textStatus, errorThrown);
    }
});

})