$(function(){

    $.ajax({
        url: '/users/verpedidos2',
        method: 'GET',
        success: function(data) {
            console.log('Datos recibidos:', data);
            $('#imagen').attr('src',data[0].tienda_imagen)
            $('.nombre').text('Nombre: ' + data[0].nombre);
            $('.tienda').text('Tienda: ' + data[0].tienda_nombre);
            $('.pedido').text('Pedido # ' + data[0].pedido_id)
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error en la petición:', textStatus, errorThrown);
        }
    });

})