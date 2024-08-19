$(function() {

    $('#deleteForm').on('submit', function(e) {
        e.preventDefault();
        


        var id = $('#id').val();
       


         
        fetch('/adminr/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body:id
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
  