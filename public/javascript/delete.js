$(function() {
   


    $('#deleteForm').on('submit', function(e) {
        e.preventDefault();
        


        var id = $('#id').val();
       


         
        fetch('/adminr/delete/'+id, {
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
            });
    
    
    })
    
  });
  