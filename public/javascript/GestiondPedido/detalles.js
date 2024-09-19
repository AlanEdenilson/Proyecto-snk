$(function(){

    $('#tabla-container').on('click', '.detalles-btn', function() {

        $(".container").load("/gestion/l1", function(response, status, xhr) {
        if (status == "error") {
            var msg = "Lo siento, ocurrió un error: ";
            $(".container").html(msg + xhr.status + " " + xhr.statusText);
        }
    // Obtener el ID del tr de la fila
    let filaId = fila.attr('id');
    console.log('ID de la fila:', filaId);

    // Aquí puedes usar el filaId para hacer algo con él, por ejemplo:
    // Enviarlo al servidor o usarlo para cargar más detalles
    $.ajax({
        url: '/gestion/detalles?id=' + filaId,
        type: 'GET',
        success: function(response) {
            console.log('Detalles cargados para el pedido:', filaId);
            console.log(response);
        },
        error: function(xhr, status, error) {
            console.error('Error al cargar los detalles:', error);
        }
    });
    });
        
        let fila = $(this).closest('tr');
        let estadoIcons = fila.find('.ver i');
    
            estadoIcons.removeClass('fas fa-eye-slash').addClass('fas fa-eye');
            estadoIcons.css('color', 'blue');



    });







})