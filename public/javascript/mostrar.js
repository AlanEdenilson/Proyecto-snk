$(function(){

  

  $.ajax({
    url: '/adminr/te53eer353r',
    type: 'GET',
    success: function(data) {
      $('#marcar').css({'display':'none'})
     
      var jsonData = data;
        console.log(jsonData)
        $('#img').attr('src',jsonData.img.imagen);
        var datos=data.data;
        console.log(datos)
        
        for (var i = 0; i < datos.length; i++) {
          
            $('.admin-table').append(`
                <tr id="${datos[i].id}" class="fila" >
                     <td><img src="${datos[i].imagen}" alt="Profile Picture" class="profile-pic"></td>
                         <td>${datos[i].nombre}</td>
                         <td>${datos[i].precio}</td>
                         <td>${datos[i].stock}</td>
                     <td>
                        <div class="actions">
                        <button class="btn-edit"  id="openModal1"
                        data-id="${datos[i].id}"
                        data-nombre="${datos[i].nombre}"
                        data-precio="${datos[i].precio}"
                        data-stock="${datos[i].stock}"
                         data-descripcion="${datos[i].descripcion}"
                        data-imagen="${datos[i].imagen}"
                     
                         >
                         Editar</button>
                         <button class="btn-delete" id="openModall"
                          data-id="${datos[i].id}"
                          data-nombre="${datos[i].nombre}"
                         >Borrar</button>
                           </div>
                        </td>
                </tr>
                 `)
    // Asegúrate de que las funciones se establecen solo una vez
        
          
      }
          
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('#setting').css({'display':'none'})
          let errorMessage = 'Ocurrió un error: ';

        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
          // Si el servidor envió un mensaje de error estructurado
          errorMessage += jqXHR.responseJSON.error;
        } else if (errorThrown) {
          // Si hay un mensaje de error genérico
          errorMessage += errorThrown;
        } else {
          // Si no hay información específica sobre el error
          errorMessage += 'No se pudo completar la operación.';
        }
        console.log(errorMessage)



    }})

    $('.admin-table').off('click', '.btn-edit').on('click', '.btn-edit', function() {
      console.log('editando')
        
      var id = $(this).data('id');
      var nombre = $(this).data('nombre');
      var precio = $(this).data('precio');
      var stock = $(this).data('stock');
      var descripcion = $(this).data('descripcion');
      var imagen = $(this).data('imagen');




      $(' #product-id').val(id);
      $('#nombre').val(nombre);
      $('#precio-unidad').val(precio);
      $('#precio-stock').val(stock);
      $('#descripcion').val(descripcion);
     
      // Mostrar la imagen actual si existe
      if (imagen) {
          $('#vistaPrevia2').attr('src',imagen).show();
          $('#imagen-actual-container').show();
      } else {
          $('#imagen-actual-container').hide();
      }
      $('#myModal1').css({
          'display':'block',
      })

      const initialValues = {
        nombre: $('#nombre').val(),
        precio:$('#precio-unidad').val(),
        stock: $('#precio-stock').val(),
        descripcion:$('#descripcion').val(),
        imagen: $('#imagen2')[0].files[0] // Obtener el archivo inicial

    };
    console.log(initialValues)
          
          $('#edit-product-form').on('submit', function(event) {
            console.log('editando..')
            event.preventDefault();
      
      
      
            var id=$(' #product-id').val();
            var url;
          
            
      
            const currentValues = {
                
                nombre: $('#nombre').val(),
                precio:$('#precio-unidad').val(),
                stock: $('#precio-stock').val(),
                descripcion:$('#descripcion').val(),
                imagen: $('#imagen2')[0].files[0] // Obtener el archivo actual
              };
      
              var imagen = $('#imagen2')[0].files[0]
              var type=false;
              var d;
      
              console.log(currentValues)
      
              const updatedFields = {};
      
              for (const key in currentValues) {
                if (currentValues[key] !== initialValues[key]) {
                  updatedFields[key] = currentValues[key];
                  
                }
              }
          
            
              const formData = new FormData();
          
              /*const files = $('#myForm input[type="file"]')[0].files;
              for (let i = 0; i < files.length; i++) {
                formData.append(`archivo`, files[i]);
                console.log(files[i])*
              }*/
          
              for (const key in updatedFields) {
                formData.append(key, updatedFields[key]);
              }
      
              console.log(updatedFields)
      
              if (typeof imagen === 'undefined'){
                url='/update1/'
                type='application/json'
                d=JSON.stringify(updatedFields)
                console.log('no se a cambiado la imagen ')
              }else{
                url='/update2/'
                console.log('enviando imagen ')
                d=formData;
      
              }
          
      
                          
            $.ajax({
              url: `/adminr${url}${id}`,
              type: 'PATCH',
              data:d,
              contentType: type, // Evita que jQuery establezca el tipo de contenido
              processData: false, // Evita que jQuery procese los datos
              success: function(data) {
              console.log(data)
              window.location.href='/ventanaAdmin'
              
              
      
                // Aquí puedes agregar código para manejar la respuesta exitosa
              },
              error: function(jqXHR, textStatus, errorThrown) {
            
                let errorMessage = 'Ocurrió un error: ';
      
        if (jqXHR.responseJSON && jqXHR.responseJSON.error) {
          // Si el servidor envió un mensaje de error estructurado
          errorMessage += jqXHR.responseJSON.error;
        } else if (errorThrown) {
          // Si hay un mensaje de error genérico
          errorMessage += errorThrown;
        } else {
          // Si no hay información específica sobre el error
          errorMessage += 'No se pudo completar la operación.';
        }
        $('.contenido76').text(errorMessage)
        $('#myModal1').css({'display':'none'})
        $('.contenido1').css({'display':'none'})
        $('.advertencia').css({'display':'block'})
      
              }
            });
      
      
      
      
          
      
      
          
        
        
      
        
      
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
       
    $('.advertencia').off('click', '.acep').on('click', '.acep', function() {
      $('.advertencia').css({'display':'none'})
     // $('.admin-table').css({'display':'block'})
      window.location.href='/ventanaAdmin'
    

   })   
      

       
})

  // Convertir los datos del formulario a JSON
             /* const jsonData = {};
                for (const [key, value] of formData.entries()) {
                  // Verificar si el campo es de tipo "file"
                  if (key === 'archivo') {
                    // Obtener el nombre del archivo
                    jsonData[key] = value.name;
                  } else {
                    jsonData[key] = value;
                  }
                }
              
                // Imprimir el objeto JSON en la consola
                console.log(JSON.stringify(jsonData));*/