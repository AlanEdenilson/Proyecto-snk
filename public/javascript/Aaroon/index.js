

$(function(){

$.ajax({
    url: '/users/vermarcas',
    method: 'GET',
    success: function(data) {
        console.log('Datos recibidos:', data);
        $('#imagen').attr('src',data[0].imagen)
        $('#nombre').text(data[0].nombre)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error en la petición:', textStatus, errorThrown);
    }
});

// $.ajax({
//     url: '/users/pedidos',
//     method: 'GET',
//     success: function(data) {
//         console.log('Datos recibidos:', data);
//     },
//     error: function(jqXHR, textStatus, errorThrown) {
//         console.error('Error en la petición:', textStatus, errorThrown);
//     }
// });




})