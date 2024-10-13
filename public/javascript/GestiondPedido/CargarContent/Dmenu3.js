var Dmenu3 = (function($){

    function cargarDetalles(valor){
        console.log('cargando detalles',valor)
 
    
    $.ajax({
        url: '/gestion/detalles?id=' + valor,
        type: 'GET',
        success: function(response) {
            console.log('Detalles cargados para el pedido:', valor);
            console.log(response);

            var img=response[0].tienda_imagen
            var nombre=response[0].tienda_nombre
            var fecha=response[0].fecha
            var nombreu=response[0].cliente_nombre
            var repartidor_nombre=response[0].repartidor_nombre
    

            $('.table-container').empty()

            response.forEach(item => {
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
                
            });
            var total = response.reduce((acc, item) => acc + item.subtotal_total, 0);
            $('.total').html(`Total: $${total}`)
            $('.invoice-title').text(`Detalles`)

            moment.locale('es');
           
           
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

                $('.invoice-date').html(`Fecha de entrega: ${diaSemana} ${diaMes} ${mes} ${anio} Repartidor: ${repartidor_nombre}`)   

           
    },
        error: function(xhr, status, error) {
            console.error('Error al cargar los detalles:', error);
        }
    });}

    function cargarDetalles1(valor){
        $.ajax({
            url: '/gestion/detalles?id=' + valor,
            type: 'GET',
            success: function(response) {
                console.log('Detalles cargados para el pedido:', valor);
                console.log(response);
    
                var img=response[0].tienda_imagen
                var nombre=response[0].tienda_nombre
                var fecha=response[0].fecha
                var nombreu=response[0].cliente_nombre
                var repartidor_nombre=response[0].repartidor_nombre
        
    
                $('.table-container').empty()
    
                response.forEach(item => {
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
                    
                });
                var total = response.reduce((acc, item) => acc + item.subtotal_total, 0);
                $('.total').html(`Total: $${total}`)
                $('.invoice-title').html(`Detalles`)
    
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
    
                    $('.invoice-date').html(`Fecha de entrega: ${diaSemana} ${diaMes} ${mes} ${anio} Repartidor: ${repartidor_nombre}`)   
    
               
        },
            error: function(xhr, status, error) {
                console.error('Error al cargar los detalles:', error);
            }
        });
    }

    return{
        cargar: cargarDetalles,
        cargar1: cargarDetalles1
    }

})(jQuery)


