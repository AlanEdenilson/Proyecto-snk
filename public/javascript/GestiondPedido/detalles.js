$(function(){
    var tienda_nombre = '';
    var propietario = '';
    var img = '';
    var fecha = '';
    function cargarDetalles(item){
        tienda_nombre = item.tienda_nombre;
        propietario = item.cliente_apellido;
        img = item.tienda_imagen;
        fecha = item.fecha;
            let fila = `<tr>
                            <td><img src="${item.producto_imagen}" alt="Producto" width="50" height="80" ></td>
                            <td>${item.producto_nombre}</td>
                            <td> $ ${item.producto_precio}</td>
                            <td>${item.cantidad_total}</td>
                            <td> $ ${item.subtotal_total}</td>
                        </tr>`;
        $('.table tbody').append(fila);
    

    }

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
           

            for(let item of response){
                cargarDetalles(item);
            }
            $('#tienda_nombre').text("Nombre tienda: " + tienda_nombre);
            $('#propietario').text( "Propietario: " + propietario);
            $('#img').attr('src', img);
            $('#fecha').text("Fecha: " + fecha);
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