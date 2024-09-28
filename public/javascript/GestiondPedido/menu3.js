$(document).ready(function(){

    function loadContent(daata){
       
        var html=';'
        daata.forEach(element => {
             var type=element.estado_vendedor==='en_camino'?'mdi--truck-fast': element.estado_vendedor=== 'pospuesto'?'svg-spinners--bars-fade':'eos-icons--hourglass'
            html+=`
            <tr >
            <td ><span class="${type}"></span>${element.estado_vendedor}</td>
        
            <td style="min-width: 200px; max-width: 200px;">${element.fecha_hora_pedido}</td>

            <td> ${element.total_cantidad}</td>
            <td style="min-width: 100px; max-width: 100px;"> ${element.total_pedido} $</td>
            <td>
            
                <label for="">
                    ${element.nombre_repartidor}
                </label>
            </td>
            <td style="min-width: 200px; max-width: 200px;">
                <label  for="">
                      ${element.fecha_entrega}
                </label>
            </td>
            <td><button data-id="${element.pedidos_ids}" class="detalles-btn"><span id="icono" class="formkit--filedoc"></span></button></td>
        </tr>  
            `
        });
        $('tbody').html(html)


    }


    console.log('menu3')
    $.ajax({
        url:'/gestion/datos/3',
        type:'GET',
        success:function(data){
            console.log(data)
            loadContent(data)
        },
        error:function(err){
            console.log(err)
        }
    })

    //cargar detalles

    $(document).on('click','.detalles-btn',function(){
        var id=$(this).data('id')
        console.log(id)
        $(".contenedor-productos").load("/gestion/detall", function(response, status, xhr) {

        if (status == "error") {
            var msg = "Lo siento, ocurrió un error: ";
            $(".container").html(msg + xhr.status + " " + xhr.statusText);
        }

        $.ajax({
            url: '/gestion/detalles?id=' + id,
            type: 'GET',
            success: function(response) {
                console.log('Detalles cargados para el pedido:', id);
                console.log(response);

                var img=response[0].tienda_imagen
                var nombre=response[0].tienda_nombre
                var fecha=response[0].fecha
                var nombreu=response[0].cliente_nombre
        

                $('.table-container').empty()

                for(let item of response){
                    var html=`
                    <tr>
                    <td ><img style="width: 100px; height: 100px;" src="${item.producto_imagen}" alt=""></td>
                    <td>${item.producto_nombre}</td>
                    <td>${item.cantidad_total}</td>
                    <td>$${item.producto_precio}</td>
                    <td>$${item.subtotal_total}</td>
                    </tr>
                    `
                    $('.table-container').append(html)
                    
                }
                var total = response.reduce((acc, item) => acc + item.subtotal_total, 0);
                $('.total').html(`Total: $${total}`)
                $('.invoice-title').html(`Factura`)

                moment.locale('es');
               
                $('#logo').attr('src',img)
                $('.company-name').html(nombre)
                $('.company-slogan').html(`Cliente: ${nombreu}`)

                var fecha = moment(fecha);
                
    // Obtener el día de la semana
                    let diaSemana = fecha.format('dddd');

                    // Obtener el mes
                    let mes = fecha.format('MMMM');

                    // Obtener el año
                    let anio = fecha.format('YYYY');

                    let diaMes = fecha.format('D');

                    $('.invoice-date').html(`Fecha de entrega: ${diaSemana} ${diaMes} ${mes} ${anio}`)   




                
               
    
               
        },
            error: function(xhr, status, error) {
                console.error('Error al cargar los detalles:', error);
            }
        });
    
    });
    })
    


})