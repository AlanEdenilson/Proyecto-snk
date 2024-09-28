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
    $(`table`).off('click','.detalles-btn').on('click','.detalles-btn',function(){
        var id=$(this).data('id')
        Dmenu3.cargar(id)
        console.log(id)
        $(".contenedor-productos").load("/gestion/detall", function(response, status, xhr) {
    
    
        if (status == "error") {
            var msg = "Lo siento, ocurrió un error: ";
            $(".container").html(msg + xhr.status + " " + xhr.statusText);
        }
    
        });
})

})
    


