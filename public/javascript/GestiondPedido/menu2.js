$(document).ready( async function() {
    $('.btn-editar').on('click', function() {
        $('.checkbox-center').css('display', 'block');
        // Cambiar todos los select de repartidor a label
        $('label[id="repartidor"]').each(function() {
            var $repartidor = $(this);
            var textoRepartidor = $repartidor.text();
            var $labelRepartidor = $('<select>', {
                id: 'repartidor'
            });
            $labelRepartidor.append($('<option>', {
                value: textoRepartidor,
                text: textoRepartidor
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion1',
                text: 'Texto opción 1'
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion2',
                text: 'Texto opción 2'
            }));
            $labelRepartidor.append($('<option>', {
                value: 'opcion3',
                text: 'Texto opción 3'
            }));
            $repartidor.replaceWith($labelRepartidor);
        });

        // Cambiar todos los input de fecha a label
        $('label[id="fecha"]').each(function() {
            var $fecha = $(this);
            var textoFecha = $fecha.text();
            console.log(textoFecha);
            var $labelFecha = $('<input>', {
                id: 'fecha',
                type: 'date',
                name: 'fecha',
                value: textoFecha
            });
            $fecha.replaceWith($labelFecha);
        });
    });

    //
    $('.btn-salir-editar').on('click', function() {
        $('.checkbox-center').css('display', 'none');
        // Cambiar todos los select de repartidor a label
        $('select[id="repartidor"]').each(function() {
            var $repartidor = $(this);
            var textoRepartidor = $repartidor.find('option:selected').text();
            var $labelRepartidor = $('<label>', {
                id: 'repartidor',
                text: textoRepartidor
            });
            $repartidor.replaceWith($labelRepartidor);
        });

        // Cambiar todos los input de fecha a label
        $('input[id="fecha"]').each(function() {
            var $fecha = $(this);
            var textoFecha = $fecha.val();
            
            var $labelFecha = $('<label>', {
                id: 'fecha',
                text: textoFecha
            });
            $fecha.replaceWith($labelFecha);
        });
    });
    // codigo restante para guardar datos en la bd 
    function ajaxw(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/gestion/pedidosProcess', // Reemplaza con la URL de tu API
            type: 'GET',
            success: function(data) {
                 // Maneja la respuesta aquí
                resolve(data)
            },
            error: function(xhr, status, error) {
                console.error('Error en la petición:', error); // Maneja el error aquí
                reject('error en la peticion')
            }
        });
    });
    }


    try {

        await BD.start()
        console.log('base de datos iniciada' )
        //
       
        if (await BD.count() !==0 ){
            console.log('ya hay registros')
        }else{
            var res = await ajaxw();
            console.log(res);
            var array= res.map(item => ({
                    
                id: item.pedidos_ids,
                fecha: item.fecha_hora_pedido,
                repartidor: item.repartidor,
                repartidorn: item.nombre_repartidor,
                fecha_entrega: item.fecha_entrega,
                estado: item.estados,
                total: item.total_pedido,
                cantidad: item.total_cantidad,
                Aceptado: false
            }));
         
            var ss = await BD.Save(array)
             console.log('datos ingresados correctamente')
           console.log(ss);
        }

    } catch (er){
        console.log(er)

    }







});