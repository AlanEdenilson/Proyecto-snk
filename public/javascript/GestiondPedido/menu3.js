$(document).ready(function(){
    console.log('menu3')

    function loadContent(daata){
       
        var html=';'
        daata.forEach(element => {
             var type=element.estado_vendedor==='en_camino'?'mdi--truck-fast': element.estado_vendedor === 'pospuesto'?'svg-spinners--bars-fade':'eos-icons--hourglass'
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
        // Añadir clase para iniciar la transición
     
        
        // Esperar a que termine la animación de salida
        setTimeout(function() {
            $(".contenedor-productos").load("/gestion/detall", function(response, status, xhr) {
                if (status == "error") {
                    var msg = "Lo siento, ocurrió un error: ";
                    $(".container").html(msg + xhr.status + " " + xhr.statusText);
                } else {
                    Dmenu3.cargar(id);
                    // Añadir clase para la animación de entrada
                   
                    
                }
            });
        }, 500); // Ajusta este tiempo según la duración de tu animación
})

    /*
    * 
      $('.detalles-btn').on('click', '.detalles-btn', function() {
        var id = $(this).data('id');
        
        // Inicia la transición de salida
        $(".contenedor-productos").addClass("slide-out");
        
        // Espera a que se complete la animación de salida
        setTimeout(function() {
          $(".contenedor-productos").load("/gestion/detall", function(response, status, xhr) {
            if (status == "error") {
              var msg = "Lo siento, ocurrió un error: ";
              $(".container").html(msg + xhr.status + " " + xhr.statusText);
            } else {
              Dmenu3.cargar(id);
              // Inicia la transición de entrada
              $(".contenedor-productos").removeClass("slide-out").addClass("slide-in");
            }
          });
        }, 500); // Ajuste este tiempo según la duración de su animación
      });
    */


})
    


