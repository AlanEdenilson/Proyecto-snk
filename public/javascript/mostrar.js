$(function(){

    $.getJSON('/adminr//te53eer353r', function(data) {
        
        

        var jsonData = data
        
        for (var i = 0; i < jsonData.length; i++) {
            console.log(jsonData[i].imagen)
            $('.admin-table').append(`
                  <tr id="${jsonData[i].id}" class="fila" >
                     <td><img src="/images/${jsonData[i].imagen}" alt="Profile Picture" class="profile-pic"></td>
                     <td>${jsonData[i].nombre}</td>
                     <td>${jsonData[i].precio}</td>
                     <td>${jsonData[i].stock}</td>
                     <td>
                         <button class="btn-edit"  id="openModal1"
                        data-id="${jsonData[i].id}"
                        data-imagen="${jsonData[i].imagen}"
                        data-nombre="${jsonData[i].nombre}"
                        data-precio="${jsonData[i].precio}"
                        data-stock="${jsonData[i].stock}"
                     
                         >
                         Editar</button>
                         <button class="btn-delete" id="openModall"
                          data-id="${jsonData[i].id}"
                          data-nombre="${jsonData[i].nombre}"
                         >Borrar</button>
                     </td>
                 </tr>
                 `)

                 
    // Asegúrate de que las funciones se establecen solo una vez
    $('.admin-table').off('click', '#openModal1').on('click', '#openModal1', function() {
        var id = $(this).data('id');
        var imagen = $(this).data('imagen');
        var nombre = $(this).data('nombre');
        var precio = $(this).data('precio');
        var stock = $(this).data('stock');

        console.log($(this).data('imagen'))
  


        $('#product-id').val(id);
        $('#nombre').val(nombre);
        $('#precio-unidad').val(precio);
        $('#precio-stock').val(stock);
       
        // Mostrar la imagen actual si existe
        if (imagen) {
            $('#imagen-actual').attr('src','/images/'+imagen).show();
            $('#imagen-actual-container').show();
        } else {
            $('#imagen-actual-container').hide();
        }
        $('#myModal1').css({
            'display':'block',
            })
    });

    $('.admin-table').off('click', '#openModall').on('click', '#openModall', function() {
        var id = $(this).data('id');
        var nombre = $(this).data('nombre');

        $('#id').val(id);
        $('#r535re').text(nombre);

        $('.modall').css({
            'display':'block',
            })
    });
  
 
    
 }
         
    
    })
       
            
      

       
})