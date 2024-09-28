$(document).ready(function(){

    function loadContent(daata){
        var html=';'
        daata.forEach(element => {
            html+=`
            <tr >
            <td ><span class="eos-icons--hourglass"></span></td>
        
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
            <td><button class="detalles-btn">≫</button></td>
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
})