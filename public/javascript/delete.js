$(function() {
   


    $('#deleteForm').on('submit', function(e) {
        e.preventDefault();
        


        var id = $('#id').val();
       


         
        fetch('/adminr/delete/'+id, {
            method: 'DELETE',
            
            })
            .then(response => response.json())
            .then(data => {
                alert('Contraseña actualizada correctamente'+data);
               
            })
            .catch(error => {
                console.error('Error:', error);
            });
    
    
    })
    
  });
  