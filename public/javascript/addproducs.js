$(function() {

    $("#Produc").on('submit', function(e) {
        e.preventDefault();

        console.log('clcik')
        var form = this;
        
        var formData = new FormData(form);
        console.log(formData)


        $.ajax({
            url: '/adminr/add',
            type: 'POST',
            data: formData,
            processData: false,  // Importante cuando se usa FormData
            contentType: false,
            success: function(response) {
                console.log(response);
                $('#myModal').css({'display':'none'})
                 window.location.href='/ventanaAdmin'
               
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

       // alert(errorMessage);
        $('.contenido76').text(errorMessage)
        $('#myModal').css({'display':'none'})
        $('.contenido1').css({'display':'none'})
        $('.advertencia').css({'display':'block'})


            }
        })

    })

    $('.advertencia').off('click', '.acep').on('click', '.acep', function() {
        $('.advertencia').css({'display':'none'})
       // $('.admin-table').css({'display':'block'})
        window.location.href='/ventanaAdmin'
      

    })
       

    
})