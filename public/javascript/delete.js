$(function() {


   


    $('#deleteForm').on('submit', function(e) {
        e.preventDefault();
        


        var id = $('#id').val();

        $.ajax({
            url: '/adminr/delete/'+id, 
            type: 'DELETE',
            success: function(response) {
                
               
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
        $('#myModall').css({'display':'none'})
        $('.contenido1').css({'display':'none'})
        $('.advertencia').css({'display':'block'})


            }
        })
       


         
       /* fetch('/adminr/delete/'+id, {
            method: 'DELETE',
            
            })
            .then(response => response.json())
            .then(data => {

                $(`#${data.id}`).closest('tr').remove();
                $('.modall').css({
                    'display':'none',
                    })
               
            })
            .catch(error => {
                console.error('Error:', error);
            });*/
    
    
    })

    $('.advertencia').off('click', '.acep').on('click', '.acep', function() {
        $('.advertencia').css({'display':'none'})
       // $('.admin-table').css({'display':'block'})
        window.location.href='/ventanaAdmin'
      

    })
    
  });
  